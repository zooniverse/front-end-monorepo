import { types } from 'mobx-state-tree'
import { observable } from 'mobx'
import ClassificationStore from './ClassificationStore'
import ProjectStore from './ProjectStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'
import {
  ClassificationFactory,
  MultipleChoiceTaskFactory,
  ProjectFactory,
  SingleChoiceTaskFactory,
  SubjectFactory,
  WorkflowFactory
} from '../../test/factories'

let ROOT_STORE_INSTANCE = null
let WORKFLOW = null

const ROOT_STORE = types
  .model('RootStore', {
    classifications: types.optional(ClassificationStore, () => ClassificationStore.create()),
    projects: types.frozen(),
    subjects: types.frozen(),
    workflows: types.optional(WorkflowStore, () => WorkflowStore.create()),
    workflowSteps: types.optional(WorkflowStepStore, () => WorkflowStepStore.create()),
    userProjectPreferences: types.frozen()
  })

describe.only('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.be.an('object')
  })

  describe('when the workflow has defined steps', function () {
    before(function () {
      WORKFLOW = WorkflowFactory.build({
        steps: [
          ['S1', { taskKeys: ['T1'] }],
          ['S2', { taskKeys: ['T2'] }]
        ],
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build()
        }
      })

      ROOT_STORE_INSTANCE = ROOT_STORE.create({
        projects: {},
        subjects: {},
        userProjectPreferences: {}
      })
      ROOT_STORE_INSTANCE.workflows.setResource(WORKFLOW)
      ROOT_STORE_INSTANCE.workflows.setActive(WORKFLOW.id)
    })

    after(function () {
      ROOT_STORE_INSTANCE = null
      WORKFLOW = null
    })

    describe('should set the steps', function () {
      let STORE_STEPS

      before(function () {
        STORE_STEPS = ROOT_STORE_INSTANCE.workflows.active.steps
      })

      it('should have the expected steps set', function () {
        expect(ROOT_STORE_INSTANCE.workflows.active.steps).to.have.lengthOf(WORKFLOW.steps.length)
        STORE_STEPS.forEach((step, index) =>
          expect(step[0]).to.equal(WORKFLOW.steps[index][0])
        )
      })

      it('should have the expected `taskKeys` for each step', function () {
        STORE_STEPS.forEach((step, stepIndex) => {
          expect(step[1].taskKeys).to.have.lengthOf(WORKFLOW.steps[stepIndex][1].taskKeys.length)

          step[1].taskKeys.forEach((taskKey, taskIndex) => {
            expect(taskKey).to.equal(WORKFLOW.steps[stepIndex][1].taskKeys[taskIndex])
          })
        })
      })
    })

    it('should set the tasks', function () {
      const { workflowSteps } = ROOT_STORE_INSTANCE

      Object.keys(WORKFLOW.tasks).forEach(taskKey => {
        const storedTask = Object.assign({}, workflowSteps.tasks.get(taskKey))
        // `taskKey` is copied from the original object for serialization by MST
        delete storedTask.taskKey
        const originalTask = WORKFLOW.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = ROOT_STORE_INSTANCE
      const firstStep = WORKFLOW.steps[0]
      const storedStep = workflowSteps.active
      expect(storedStep.stepKey).to.equal(firstStep[0])
      firstStep[1].taskKeys.forEach((taskKey, index) => {
        expect(taskKey).to.equal(firstStep[1].taskKeys[index])
      })
      expect(storedStep.next).to.equal(firstStep[1].next)
    })
  })

  describe('when the workflow does not have defined steps', function () {
    before(function () {
      WORKFLOW = WorkflowFactory.build({
        first_task: 'T1',
        tasks: {
          T1: SingleChoiceTaskFactory.build(),
          T2: MultipleChoiceTaskFactory.build()
        }
      })

      ROOT_STORE_INSTANCE = ROOT_STORE.create({
        projects: {},
        subjects: {},
        userProjectPreferences: {}
      })
      ROOT_STORE_INSTANCE.workflows.setResource(WORKFLOW)
      ROOT_STORE_INSTANCE.workflows.setActive(WORKFLOW.id)
    })

    after(function () {
      ROOT_STORE_INSTANCE = null
      WORKFLOW = null
    })

    it('should convert the tasks to steps and set the steps', function () {
      const { workflowSteps } = ROOT_STORE_INSTANCE
      const stepsSize = workflowSteps.steps.size
      expect(stepsSize).to.equal(Object.keys(WORKFLOW.tasks).length)
    })

    it('should set the tasks', function () {
      const { workflowSteps } = ROOT_STORE_INSTANCE
      Object.keys(WORKFLOW.tasks).forEach(taskKey => {
        const storedTask = Object.assign({}, workflowSteps.tasks.get(taskKey))
        // `taskKey` is copied from the original object for serialization by MST
        delete storedTask.taskKey
        const originalTask = WORKFLOW.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = ROOT_STORE_INSTANCE
      const storedStep = workflowSteps.active
      expect(storedStep.stepKey).to.equal('S0')
      storedStep.taskKeys.forEach(taskKey =>
        expect(taskKey).to.equal(WORKFLOW.first_task)
      )
    })
  })

  describe('Views > shouldWeShowDoneAndTalkButton', function () {
    let hiddenSummaryWorkflow
    let subject
    before(function () {
      WORKFLOW = WorkflowFactory.build({
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

      subject = SubjectFactory.build()
    })

    after(function () {
      ROOT_STORE_INSTANCE = null
      subject = null
      WORKFLOW = null
    })

    function setupDoneAndTalkTest ({ workflow, createClassification }) {
      ROOT_STORE_INSTANCE = ROOT_STORE.create({
        projects: {},
        subjects: {},
        userProjectPreferences: {}
      })

      if (workflow) {
        ROOT_STORE_INSTANCE.workflows.setResource(workflow)
        ROOT_STORE_INSTANCE.workflows.setActive(workflow.id)
      }

      if (createClassification) {
        const project = ProjectFactory.build({}, { activeWorkflowId: workflow.id })
        ROOT_STORE_INSTANCE.classifications.createClassification(subject, workflow, project)
      }
    }

    it('should return false if there is not an active workflow', function () {
      setupDoneAndTalkTest({})
      expect(ROOT_STORE_INSTANCE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return false if there is not an active classification', function () {
      setupDoneAndTalkTest({ workflow: WORKFLOW })
      expect(ROOT_STORE_INSTANCE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return false if not on the last step', function () {
      setupDoneAndTalkTest({ workflow: WORKFLOW })
      expect(ROOT_STORE_INSTANCE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return false if the workflow is not configured to hide classification summaries', function () {
      setupDoneAndTalkTest({ workflow: WORKFLOW, createClassification: true })
      ROOT_STORE_INSTANCE.workflowSteps.selectStep('S2')
      // returns as falsey undefined rather than explicit false
      // this is because usually the workflow has hide_classification_summaries as undefined in the config
      // rather than explicitly set as false
      expect(ROOT_STORE_INSTANCE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.undefined
    })

    it('should return false if the classification subject has been flagged', function () {
      setupDoneAndTalkTest({ workflow: hiddenSummaryWorkflow, createClassification: true })
      ROOT_STORE_INSTANCE.classifications.updateClassificationMetadata({ subject_flagged: true })
      ROOT_STORE_INSTANCE.workflowSteps.selectStep('S2')
      expect(ROOT_STORE_INSTANCE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return true if the conditions are met', function () {
      setupDoneAndTalkTest({ workflow: hiddenSummaryWorkflow, createClassification: true })
      ROOT_STORE_INSTANCE.workflowSteps.selectStep('S2')
      expect(ROOT_STORE_INSTANCE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.true
    })
  })
})