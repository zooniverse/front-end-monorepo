import RootStore from './RootStore'

import WorkflowStepStore from './WorkflowStepStore'
import {
  MultipleChoiceTaskFactory,
  ProjectFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '@test/factories'
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
    })

    it('should set the tasks for each step', function () {
      const STORE_STEPS = rootStore.workflowSteps.steps

      STORE_STEPS.forEach(step => {
        step.tasks.forEach(task => {
          const annotation = undefined
          const { taskKey } = task
          const originalTask = Object.assign({}, workflow.tasks[taskKey], { annotation, taskKey })
          expect(task).to.eql(originalTask)
        })
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = rootStore
      const firstStep = workflow.steps[0]
      const storedStep = workflowSteps.active
      expect(storedStep.stepKey).to.equal(firstStep[0])
      firstStep[1].taskKeys.forEach((taskKey, index) => {
        expect(taskKey).to.equal(firstStep[1].taskKeys[index])
      })
      expect(storedStep.next).to.equal(firstStep[1].next)
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
          const originalTask = Object.assign({}, workflow.tasks[taskKey], { annotation, taskKey })
          expect(task).to.eql(originalTask)
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
          const originalTask = Object.assign({}, workflow.tasks[taskKey], { annotation, taskKey })
          expect(task).to.eql(originalTask)
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

    it('should return false if the workflow is not configured to hide classification summaries', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, workflow)
      rootStore.classifications.createClassification(subject, workflow, project)
      rootStore.workflowSteps.selectStep('S2')
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return false if the classification subject has been flagged', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: hiddenSummaryWorkflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: hiddenSummaryWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, hiddenSummaryWorkflow)
      rootStore.classifications.createClassification(subject, hiddenSummaryWorkflow, project)
      rootStore.classifications.active.metadata.update({ subject_flagged: true })
      rootStore.workflowSteps.selectStep('S2')
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return true if the conditions are met', async function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: hiddenSummaryWorkflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: hiddenSummaryWorkflow, subjects })
      const rootStore = await setupStores(panoptesClientStub, project, hiddenSummaryWorkflow)
      rootStore.classifications.createClassification(subject, hiddenSummaryWorkflow, project)
      rootStore.workflowSteps.selectStep('S2')
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.true()
    })
  })
})
