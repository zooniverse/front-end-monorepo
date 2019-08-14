import RootStore from './RootStore'

import WorkflowStepStore from './WorkflowStepStore'
import {
  ClassificationFactory,
  MultipleChoiceTaskFactory,
  ProjectFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '../../test/factories'
import { Factory } from 'rosie'
import stubPanoptesJs from '../../test/stubPanoptesJs'

function setupStores(clientStub, project, workflow) {
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

  store.projects.setResource(project)
  store.projects.setActive(project.id)
  if (workflow) {
    store.workflows.setResource(workflow)
    store.workflows.setActive(workflow.id)
  }
  return store
}

describe.only('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.be.an('object')
  })

  describe('when the workflow has defined steps', function () {
    let rootStore
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

      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ projects: project, workflows: workflow })
      rootStore = setupStores(panoptesClientStub, project)
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

    it('should set the tasks', function () {
      const { workflowSteps } = rootStore
      Object.keys(workflow.tasks).forEach(taskKey => {
        const storedTask = Object.assign({}, workflowSteps.tasks.get(taskKey))
        // `taskKey` is copied from the original object for serialization by MST
        delete storedTask.taskKey
        const originalTask = workflow.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
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
    before(function () {
      workflow = WorkflowFactory.build({
        first_task: 'T1',
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build()
        }
      })
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ projects: project, workflows: workflow })
      rootStore = setupStores(panoptesClientStub, project)
    })

    it('should convert the tasks to steps and set the steps', function () {
      const { workflowSteps } = rootStore
      const numberOfTasks = Object.keys(workflow.tasks).length
      expect(workflowSteps.steps).to.have.lengthOf(numberOfTasks)
    })

    it('should set the tasks', function () {
      const { workflowSteps } = rootStore
      Object.keys(workflow.tasks).forEach(taskKey => {
        const storedTask = Object.assign({}, workflowSteps.tasks.get(taskKey))
        // `taskKey` is copied from the original object for serialization by MST
        delete storedTask.taskKey
        const originalTask = workflow.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
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

    it('should return false if there is not an active workflow', function () {
      const project = ProjectFactory.build({})
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = setupStores(panoptesClientStub, project)
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return false if there is not an active classification', function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = setupStores(panoptesClientStub, project, workflow)
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return false if not on the last step', function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = setupStores(panoptesClientStub, project, workflow)
      rootStore.classifications.createClassification(subject, workflow, project)
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return false if the workflow is not configured to hide classification summaries', function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: workflow, subjects })
      const rootStore = setupStores(panoptesClientStub, project, workflow)
      rootStore.classifications.createClassification(subject, workflow, project)
      rootStore.workflowSteps.selectStep('S2')
      // returns as falsey undefined rather than explicit false
      // this is because usually the workflow has hide_classification_summaries as undefined in the config
      // rather than explicitly set as false
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.undefined()
    })

    it('should return false if the classification subject has been flagged', function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: hiddenSummaryWorkflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: hiddenSummaryWorkflow, subjects })
      const rootStore = setupStores(panoptesClientStub, project, hiddenSummaryWorkflow)
      rootStore.classifications.createClassification(subject, hiddenSummaryWorkflow, project)
      rootStore.classifications.updateClassificationMetadata({ subject_flagged: true })
      rootStore.workflowSteps.selectStep('S2')
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false()
    })

    it('should return true if the conditions are met', function () {
      const project = ProjectFactory.build({}, { activeWorkflowId: hiddenSummaryWorkflow.id })
      const panoptesClientStub = stubPanoptesJs({ workflows: hiddenSummaryWorkflow, subjects })
      const rootStore = setupStores(panoptesClientStub, project, hiddenSummaryWorkflow)
      rootStore.classifications.createClassification(subject, hiddenSummaryWorkflow, project)
      rootStore.workflowSteps.selectStep('S2')
      expect(rootStore.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.true()
    })
  })
})
