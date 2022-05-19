import RootStore from '../RootStore'

import WorkflowStepStore from './WorkflowStepStore'
import {
  DrawingTaskFactory,
  MultipleChoiceTaskFactory,
  ProjectFactory,
  SingleChoiceTaskFactory,
  TranscriptionTaskFactory,
  WorkflowFactory
} from '@test/factories'
import { getSnapshot } from 'mobx-state-tree'
import { Factory } from 'rosie'
import stubPanoptesJs from '@test/stubPanoptesJs'

async function setupStores (clientStub, project, workflow) {
  const store = RootStore.create({
    classifications: {},
    dataVisAnnotating: {},
    drawing: {},
    feedback: {},
    fieldGuide: {},
    subjects: {},
    subjectViewer: {},
    tutorials: {},
    userProjectPreferences: {}
  }, {
    client: clientStub,
    authClient: { checkBearerToken: () => Promise.resolve(), checkCurrent: () => Promise.resolve() }
  })

  store.projects.setResources([project])
  store.projects.setActive(project.id)
  if (workflow) {
    store.workflows.setResources([workflow])
    await store.workflows.selectWorkflow(workflow.id)
  }
  return store
}

describe('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.be.an('object')
  })

  describe('when the workflow has defined steps', function () {
    let rootStore
    let workflow
    before(async function () {
      workflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }],
          ['S2', { taskKeys: ['T2'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build()
        }
      })

      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({
        projects: project,
        subjects: Factory.buildList('subject', 10),
        workflows: workflow
      })
      rootStore = await setupStores(panoptesClientStub, project, workflow)
    })

    describe('should set the steps', function () {
      let STORE_STEPS

      before(function () {
        STORE_STEPS = rootStore.workflows.active.steps
      })

      it('should have the expected steps set', function () {
        expect(rootStore.workflows.active.steps).to.have.lengthOf(workflow.steps.length)
        STORE_STEPS.forEach((step, index) =>
          expect(step[0]).to.equal(workflow.steps[index][0])
        )
      })

      it('should have the expected `taskKeys` for each step', function () {
        STORE_STEPS.forEach((step, stepIndex) => {
          expect(step[1].taskKeys).to.have.lengthOf(workflow.steps[stepIndex][1].taskKeys.length)

          step[1].taskKeys.forEach((taskKey, taskIndex) => {
            expect(taskKey).to.equal(workflow.steps[stepIndex][1].taskKeys[taskIndex])
          })
        })
      })

      it('should set the next step', function () {
        STORE_STEPS.forEach((step, stepIndex) => {
          let nextStep
          if (STORE_STEPS.length > 0 && stepIndex + 2 <= STORE_STEPS.length) {
            nextStep = step[stepIndex + 1]
          }
          if (nextStep) {
            expect(step.next).to.equal(nextStep.stepKey)
          }

          expect(step.next).to.be.undefined()
        })
      })
    })

    it('should set the tasks for each step', function () {
      const STORE_STEPS = rootStore.workflowSteps.steps

      STORE_STEPS.forEach(step => {
        step.tasks.forEach(task => {
          const annotation = undefined
          const { taskKey } = task
          const strings = {}
          const originalTask = { ...workflow.tasks[taskKey], annotation, strings, taskKey }
          expect(getSnapshot(task)).to.eql(originalTask)
        })
      })
    })

    it('should select the first step to be active', function () {
      const { workflowSteps } = rootStore
      const firstStep = workflow.steps[0]
      const firstStepKey = firstStep[0]
      const firstStepSnapshot = firstStep[1]
      const storedStep = workflowSteps.active

      expect(storedStep.stepKey).to.equal(firstStepKey)
      firstStepSnapshot.taskKeys.forEach((taskKey, index) => {
        expect(taskKey).to.equal(storedStep.taskKeys[index])
      })
      expect(storedStep.next).to.be.undefined()
    })
  })

  describe('when the workflow does not have defined steps', function () {
    let rootStore
    let workflow
    before(async function () {
      workflow = WorkflowFactory.build({
        first_task: 'T1',
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build(),
          T3: MultipleChoiceTaskFactory.build(),
          T4: {
            type: 'combo',
            tasks: ['T2', 'T3']
          }
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({
        projects: project,
        subjects: Factory.buildList('subject', 10),
        workflows: workflow
      })
      rootStore = await setupStores(panoptesClientStub, project, workflow)
    })

    it('should convert the tasks to steps and set the steps', function () {
      const { workflowSteps } = rootStore
      expect(workflowSteps.steps).to.have.lengthOf(2)
    })

    it('should assign each task to a step', function () {
      const STORE_STEPS = rootStore.workflowSteps.steps

      STORE_STEPS.forEach(step => {
        step.tasks.forEach(task => {
          const annotation = undefined
          const { taskKey } = task
          const strings = {}
          const originalTask = { ...workflow.tasks[taskKey], annotation, strings, taskKey }
          expect(getSnapshot(task)).to.eql(originalTask)
        })
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = rootStore
      const storedStep = workflowSteps.active
      expect(storedStep.stepKey).to.equal('S0')
      storedStep.taskKeys.forEach(taskKey =>
        expect(taskKey).to.equal(workflow.first_task)
      )
    })

    it('should generate a step from the combo task', function () {
      const { workflowSteps } = rootStore
      const comboStep = workflowSteps.steps.get('S1')
      expect(comboStep.taskKeys).to.deep.equal(['T2', 'T3'])
    })
  })

  describe('when the workflow tasks define next steps as tasks (backwards compatibility)', function () {
    let rootStore
    let workflow
    before(async function () {
      workflow = WorkflowFactory.build({
        first_task: 'T1',
        tasks: {
          T1: SingleChoiceTaskFactory.build({
            answers: [
              { label: 'Yes', next: 'T4' },
              { label: 'No', next: 'T4' }
            ]
          }),
          T2: MultipleChoiceTaskFactory.build(),
          T3: MultipleChoiceTaskFactory.build(),
          T4: {
            type: 'combo',
            tasks: ['T2', 'T3'],
            next: 'T5'
          },
          T5: MultipleChoiceTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({
        projects: project,
        subjects: Factory.buildList('subject', 10),
        workflows: workflow
      })
      rootStore = await setupStores(panoptesClientStub, project, workflow)
    })

    it('should convert the tasks to steps and set the steps', function () {
      const { workflowSteps } = rootStore
      expect(workflowSteps.steps).to.have.lengthOf(3)
    })

    it('should assign each task to a step', function () {
      const STORE_STEPS = rootStore.workflowSteps.steps

      STORE_STEPS.forEach(step => {
        step.tasks.forEach(task => {
          const annotation = undefined
          const { taskKey } = task
          const strings = {}
          const originalTask = { ...workflow.tasks[taskKey], annotation, strings, taskKey }
          expect(getSnapshot(task)).to.eql(originalTask)
        })
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = rootStore
      const storedStep = workflowSteps.active
      expect(storedStep.stepKey).to.equal('S0')
      storedStep.taskKeys.forEach(taskKey =>
        expect(taskKey).to.equal(workflow.first_task)
      )
    })

    it('should generate a step from the combo task', function () {
      const { workflowSteps } = rootStore
      const comboStep = workflowSteps.steps.get('S1')
      expect(comboStep.taskKeys).to.deep.equal(['T2', 'T3'])
    })

    it('should define the next step as appropriate', function () {
      const { workflowSteps } = rootStore
      const firstStep = workflowSteps.steps.get('S0')
      expect(firstStep.next).to.equal('S1')
      const secondStep = workflowSteps.steps.get('S1')
      expect(secondStep.next).to.equal('S2')
      const thirdStep = workflowSteps.steps.get('S2')
      expect(thirdStep.next).to.equal(undefined)
    })
  })

  describe('Views > shouldWeShowDoneAndTalkButton', function () {
    let subjects
    let subject
    let hiddenSummaryWorkflow
    let showSummaryWorkflow
    let workflow
    before(function () {
      workflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }],
          ['S2', { taskKeys: ['T2'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build()
        }
      })

      hiddenSummaryWorkflow = WorkflowFactory.build({
        configuration: {
          hide_classification_summaries: true
        },
        steps: [
          ['S1', { taskKeys: ['T1'] }],
          ['S2', { taskKeys: ['T2'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build()
        }
      })

      showSummaryWorkflow = WorkflowFactory.build({
        configuration: {
          hide_classification_summaries: false
        },
        steps: [
          ['S1', { taskKeys: ['T1'] }],
          ['S2', { taskKeys: ['T2'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build()
        }
      })

      subjects = Factory.buildList('subject', 10)
      subject = subjects[0]
    })

    it('should return false if there is not an active workflow', async function () {
      const project = ProjectFactory.build({})
      const panoptesClientStub = stubPanoptesJs({ workflows: [], subjects })
      const rootStore = await setupStores(panoptesClientStub, project)
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return false if there is not an active classification', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, workflow)
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return false if not on the last step', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, workflow)
      rootStore.classifications.createClassification(subject, workflow, project)
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    describe('for any value of hide_classification_summaries', function () {
      let workflows

      before(function () {
        workflows = [ workflow, hiddenSummaryWorkflow, showSummaryWorkflow ]
      })

      it('should be true by default', async function () {
        const awaitWorkflows = workflows.map(async function (testWorkflow) {
          const project = ProjectFactory.build({}, { activeWorkflowId: testWorkflow.id })
          const panoptesClientStub = stubPanoptesJs({ workflows: testWorkflow, subjects })
          const rootStore = await setupStores(panoptesClientStub, project, testWorkflow)
          rootStore.classifications.createClassification(subject, testWorkflow, project)
          rootStore.workflowSteps.selectStep('S2')
          expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.true()
        })
        await Promise.all(awaitWorkflows)
      })

      it('should be false if the classification has been flagged', async function () {
        const awaitWorkflows = workflows.map(async function (testWorkflow) {
          const project = ProjectFactory.build({}, { activeWorkflowId: testWorkflow.id })
          const panoptesClientStub = stubPanoptesJs({ workflows: testWorkflow, subjects })
          const rootStore = await setupStores(panoptesClientStub, project, testWorkflow)
          rootStore.classifications.createClassification(subject, testWorkflow, project)
          rootStore.classifications.active.metadata.update({ subject_flagged: true })
          rootStore.workflowSteps.selectStep('S2')
          expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
        })
        await Promise.all(awaitWorkflows)
      })
    })
  })

  describe('Views > findTasksByType', function () {
    let rootStore, workflow
    const singleChoiceTask = SingleChoiceTaskFactory.build({
      answers: [
        { label: 'Yes', next: 'T2' },
        { label: 'No', next: 'T2' }
      ]
    })
    const multipleChoiceTaskOne = MultipleChoiceTaskFactory.build()
    const multipleChoiceTaskTwo = MultipleChoiceTaskFactory.build()
    before(async function () {
      workflow = WorkflowFactory.build({
        first_task: 'T1',
        tasks: {
          T1: singleChoiceTask,
          T2: multipleChoiceTaskOne,
          T3: multipleChoiceTaskTwo,
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({
        projects: project,
        subjects: Factory.buildList('subject', 10),
        workflows: workflow
      })
      rootStore = await setupStores(panoptesClientStub, project, workflow)
    })

    it('should return tasks that equal the task type argument given', function () {
      const singleChoiceTasks = rootStore.workflowSteps.findTasksByType('single')
      const multipleChoiceTasks = rootStore.workflowSteps.findTasksByType('multiple')
      const drawingTasks = rootStore.workflowSteps.findTasksByType('drawing')
      expect(singleChoiceTasks).to.have.lengthOf(1)
      expect(singleChoiceTasks[0].type).to.equal('single')
      expect(multipleChoiceTasks).to.have.lengthOf(2)
      expect(multipleChoiceTasks[0].type).to.equal('multiple')
      expect(multipleChoiceTasks[1].type).to.equal('multiple')
      expect(drawingTasks).to.have.lengthOf(0)
    })
  })

  describe('Views > interactionTask', function () {
    let transcriptionWorkflow, manyStepWorkflow, drawingWorkflow, singleChoiceWorkflow

    before(function () {
      transcriptionWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: TranscriptionTaskFactory.build()
        }
      })

      manyStepWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T0'] }],
          ['S2',  { taskKeys: ['T1'] }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build(),
          T1: DrawingTaskFactory.build()
        }
      })

      drawingWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: DrawingTaskFactory.build()
        }
      })

      singleChoiceWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build()
        }
      })
    })

    it('should return an empty object if the workflow does not have either an active drawing or transcription task', async function ()  {
      const project = ProjectFactory.build({}, { activeWorkflowId: singleChoiceWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: singleChoiceWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, singleChoiceWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.interactionTask).to.be.empty()
    })

    it('should return an empty object if the workflow drawing task is not part of the active step', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: manyStepWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: manyStepWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, manyStepWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.interactionTask).to.be.empty()
    })

    it('should return the active step drawing task', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: drawingWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: drawingWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, drawingWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.interactionTask.type).to.equal('drawing')
    })

    it('should return the transcription task', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: transcriptionWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: transcriptionWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, transcriptionWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.interactionTask.type).to.equal('transcription')
    })
  })

  describe('Views > activeInteractionTask', function () {
    let transcriptionWorkflow, manyStepDrawingWorkflow, manyStepTranscriptionWorkflow, drawingWorkflow, singleChoiceWorkflow

    before(function () {
      transcriptionWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: TranscriptionTaskFactory.build()
        }
      })

      manyStepDrawingWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T0'] }],
          ['S2', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build(),
          T1: DrawingTaskFactory.build()
        }
      })

      manyStepTranscriptionWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T0'] }],
          ['S2', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build(),
          T1: TranscriptionTaskFactory.build()
        }
      })

      drawingWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: DrawingTaskFactory.build()
        }
      })

      singleChoiceWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build()
        }
      })
    })

    it('should return an empty object if the workflow does not have either an active drawing or transcription task', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: singleChoiceWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: singleChoiceWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, singleChoiceWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask).to.be.empty()
    })

    it('should return an empty object if the workflow drawing task is not part of the active step', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: manyStepDrawingWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: manyStepDrawingWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, manyStepDrawingWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask).to.be.empty()
    })

    it('should return an empty object if the workflow transcription task is not part of the active step', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: manyStepTranscriptionWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: manyStepTranscriptionWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, manyStepTranscriptionWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask).to.be.empty()
    })

    it('should return the active step drawing task', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: drawingWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: drawingWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, drawingWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask.type).to.equal('drawing')
    })

    it('should return the active transcription task', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: transcriptionWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: transcriptionWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, transcriptionWorkflow)
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask.type).to.equal('transcription')
    })
  })
})
