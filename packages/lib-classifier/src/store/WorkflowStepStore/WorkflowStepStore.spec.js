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

import mockStore from '@test/mockStore'
import stubPanoptesJs from '@test/stubPanoptesJs'

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
      rootStore = mockStore({ client: panoptesClientStub, project, workflow })
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
      rootStore = mockStore({ client: panoptesClientStub, project, workflow })
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
      rootStore = mockStore({ client: panoptesClientStub, project, workflow })
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

  describe('with localised text strings', function () {
    let rootStore

    before(function () {
      const workflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }],
          ['S2', { taskKeys: ['T2'] }]
        ],
        strings: {
          'tasks.T1.question': 'T1: Translated question',
          'tasks.T1.answers.0.label': 'T1: Translated answer 1',
          'tasks.T1.answers.1.label': 'T1: Translated answer 2',
          'tasks.T2.question': 'T2: Translated question',
          'tasks.T2.answers.0.label': 'T2: Translated answer 1',
          'tasks.T2.answers.1.label': 'T2: Translated answer 2',
          'tasks.T2.answers.2.label': 'T2: Translated answer 3',
        },
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
      rootStore = mockStore({ client: panoptesClientStub, project, workflow })
    })

    it('should localise task text', function() {
      expect(rootStore.workflowSteps.steps.size).to.equal(2)
      rootStore.workflowSteps.steps.forEach(step => {
        step.tasks.forEach(({ taskKey, strings, answers }) => {
          expect(strings).to.exist()
          expect(strings.get('question')).to.equal(`${taskKey}: Translated question`)
          answers.forEach((answer, index) => {
            expect(strings.get(`answers.${index}.label`)).to.equal(`${taskKey}: Translated answer ${index + 1}`)
          })
        })
      })
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
          ['S1', { taskKeys: ['T1'], next: 'S2' }],
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

    it('should be false if there is not an active workflow', async function () {
      const project = ProjectFactory.build({})
      const panoptesClientStub = stubPanoptesJs({ workflows: [], subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project })
      rootStore.workflows.reset()
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should be false if there is not an active classification', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow })
      rootStore.classifications.reset()
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should be false if there is a next step', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow })
      rootStore.workflowSteps.selectStep('S1')
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
          const rootStore = mockStore({ client: panoptesClientStub, project, workflow: testWorkflow })
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
          const rootStore = mockStore({ client: panoptesClientStub, project, workflow: testWorkflow })
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
      rootStore = mockStore({ client: panoptesClientStub, project, workflow })
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
    it('should be empty if the workflow does not have either an active drawing or transcription task', async function ()  {
      const singleChoiceWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: singleChoiceWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: singleChoiceWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: singleChoiceWorkflow })
      rootStore.workflowSteps.selectStep('S1')
      expect(rootStore.workflowSteps.interactionTask).to.be.empty()
    })

    it('should be empty if the workflow drawing task is not part of the active step', async function () {
      const manyStepWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T0'] }],
          ['S2',  { taskKeys: ['T1'] }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build(),
          T1: DrawingTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: manyStepWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: manyStepWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: manyStepWorkflow })
      rootStore.workflowSteps.selectStep('S1')
      expect(rootStore.workflowSteps.interactionTask).to.be.empty()
    })

    it('should be the active step drawing task', async function () {
      const drawingWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: DrawingTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: drawingWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: drawingWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: drawingWorkflow })
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.interactionTask.type).to.equal('drawing')
    })

    it('should be the transcription task', async function () {
      const transcriptionWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: TranscriptionTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: transcriptionWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: transcriptionWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: transcriptionWorkflow })
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.interactionTask.type).to.equal('transcription')
    })
  })

  describe('Views > activeInteractionTask', function () {
    it('should be empty if the workflow does not have either an active drawing or transcription task', async function () {
      const singleChoiceWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: singleChoiceWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: singleChoiceWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: singleChoiceWorkflow })
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask).to.be.empty()
    })

    it('should be empty if the workflow drawing task is not part of the active step', async function () {
      const manyStepDrawingWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T0'] }],
          ['S2', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build(),
          T1: DrawingTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: manyStepDrawingWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: manyStepDrawingWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: manyStepDrawingWorkflow })
      rootStore.workflowSteps.selectStep('S1')
      expect(rootStore.workflowSteps.activeInteractionTask).to.be.empty()
    })

    it('should be empty if the workflow transcription task is not part of the active step', async function () {
      const manyStepTranscriptionWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T0'] }],
          ['S2', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T0: SingleChoiceTaskFactory.build(),
          T1: TranscriptionTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: manyStepTranscriptionWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: manyStepTranscriptionWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: manyStepTranscriptionWorkflow })
      rootStore.workflowSteps.selectStep('S1')
      expect(rootStore.workflowSteps.activeInteractionTask).to.be.empty()
    })

    it('should be the active step drawing task', async function () {
      const drawingWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: DrawingTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: drawingWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: drawingWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: drawingWorkflow })
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask.type).to.equal('drawing')
    })

    it('should be the active transcription task', async function () {
      const transcriptionWorkflow = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }]
        ],
        tasks: {
          T1: TranscriptionTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: transcriptionWorkflow.id })
      const subjects = Factory.buildList('subject', 10)
      const panoptesClientStub = stubPanoptesJs({ workflows: transcriptionWorkflow, subjects })
      const rootStore = mockStore({ client: panoptesClientStub, project, workflow: transcriptionWorkflow })
      rootStore.workflowSteps.selectStep()
      expect(rootStore.workflowSteps.activeInteractionTask.type).to.equal('transcription')
    })
  })
})
