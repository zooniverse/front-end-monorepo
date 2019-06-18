import { types } from 'mobx-state-tree'
import RootStore from './RootStore'
import WorkflowStepStore from './WorkflowStepStore'
import {
  ClassificationFactory,
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '../../test/factories'

let WORKFLOW = null

let ROOT_STORE

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

      ROOT_STORE = RootStore.create({
        classifications: {},
        dataVisAnnotating: {},
        drawing: {},
        feedback: {},
        fieldGuide: {},
        projects: {},
        subjects: {},
        subjectViewer: {},
        tutorials: {},
        workflows: {},
        userProjectPreferences: {}
      })
      ROOT_STORE.workflows.setResource(WORKFLOW)
      ROOT_STORE.workflows.setActive(WORKFLOW.id)
    })

    after(function () {
      ROOT_STORE = null
      WORKFLOW = null
    })

    describe('should set the steps', function () {
      let STORE_STEPS

      before(function () {
        STORE_STEPS = ROOT_STORE.workflows.active.steps
      })

      it('should have the expected steps set', function () {
        expect(ROOT_STORE.workflows.active.steps).to.have.lengthOf(WORKFLOW.steps.length)
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
      const { workflowSteps } = ROOT_STORE
      const storeTasks = workflowSteps.tasks.toJSON()
      Object.keys(WORKFLOW.tasks).forEach(taskKey => {
        const storedTask = Object.assign({}, workflowSteps.tasks.get(taskKey))
        // `taskKey` is copied from the original object for serialization by MST
        delete storedTask.taskKey
        const originalTask = WORKFLOW.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = ROOT_STORE
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

      ROOT_STORE = RootStore.create({
        classifications: {},
        dataVisAnnotating: {},
        drawing: {},
        feedback: {},
        fieldGuide: {},
        projects: {},
        subjects: {},
        subjectViewer: {},
        tutorials: {},
        workflows: {},
        userProjectPreferences: {}
      })
      ROOT_STORE.workflows.setResource(WORKFLOW)
      ROOT_STORE.workflows.setActive(WORKFLOW.id)
    })

    after(function () {
      ROOT_STORE = null
      WORKFLOW = null
    })

    it('should convert the tasks to steps and set the steps', function () {
      const { workflowSteps } = ROOT_STORE
      expect(ROOT_STORE.workflows.active.steps).to.have.lengthOf(WORKFLOW.steps.length)
      expect(workflowSteps.steps).to.have.lengthOf(WORKFLOW.steps.length)
    })

    it('should set the tasks', function () {
      const { workflowSteps } = ROOT_STORE
      Object.keys(WORKFLOW.tasks).forEach(taskKey => {
        const storedTask = Object.assign({}, workflowSteps.tasks.get(taskKey))
        // `taskKey` is copied from the original object for serialization by MST
        delete storedTask.taskKey
        const originalTask = WORKFLOW.tasks[taskKey]
        expect(storedTask).to.eql(originalTask)
      })
    })

    it('should set the first step to be active', function () {
      const { workflowSteps } = ROOT_STORE
      const storedStep = workflowSteps.active
      expect(storedStep.stepKey).to.equal('S0')
      storedStep.taskKeys.forEach(taskKey =>
        expect(taskKey).to.equal(WORKFLOW.first_task)
      )
    })
  })

  describe('Views > shouldWeShowDoneAndTalkButton', function () {
    let classification
    let flaggedClassification
    let hiddenSummaryWorkflow
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

      classification = ClassificationFactory.build({
        annotations: [
          { task: 'T1', value: 0 },
          { task: 'T2', value: [0, 2] }
        ]
      })

      flaggedClassification = ClassificationFactory.build({
        annotations: [
          { task: 'T1', value: 0 },
          { task: 'T2', value: [0, 2] }
        ],
        metadata: {
          subject_flagged: true
        }
      })
      
    })

    beforeEach(function () {
      ROOT_STORE = RootStore.create({
        classifications: {},
        dataVisAnnotating: {},
        drawing: {},
        feedback: {},
        fieldGuide: {},
        projects: {},
        subjects: {},
        subjectViewer: {},
        tutorials: {},
        workflows: {},
        userProjectPreferences: {}
      })
    })

    after(function () {
      ROOT_STORE = null
      WORKFLOW = null
    })

    it('should return false if there is not an active workflow', function () {
      expect(ROOT_STORE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return false if there is not an active classification', function () {
      expect(ROOT_STORE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return false if not on the last step', function () {
      ROOT_STORE.workflows.setResource(WORKFLOW)
      ROOT_STORE.workflows.setActive(WORKFLOW.id)
      ROOT_STORE.classifications.setResource(classification)
      ROOT_STORE.classifications.setActive(classification.id)
      expect(ROOT_STORE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return false if the workflow is not configured to hide classification summaries', function () {
      ROOT_STORE.workflowSteps.selectStep('S2')
      // returns as falsey undefined rather than explicit false
      // this is because usually the workflow has hide_classification_summaries as undefined in the config
      // rather than explicitly set as false
      expect(ROOT_STORE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.undefined
    })

    it('should return false if the classification subject has been flagged', function () {
      ROOT_STORE.workflows.setResource(hiddenSummaryWorkflow)
      ROOT_STORE.workflows.setActive(hiddenSummaryWorkflow.id)
      ROOT_STORE.classifications.setResource(flaggedClassification)
      ROOT_STORE.classifications.setActive(flaggedClassification.id)
      ROOT_STORE.workflowSteps.selectStep('S2')
      expect(ROOT_STORE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.false
    })

    it('should return true if the conditions are met', function () {
      ROOT_STORE.workflows.setResource(hiddenSummaryWorkflow)
      ROOT_STORE.workflows.setActive(hiddenSummaryWorkflow.id)
      ROOT_STORE.classifications.setResource(classification)
      ROOT_STORE.classifications.setActive(classification.id)
      ROOT_STORE.workflowSteps.selectStep('S2')
      expect(ROOT_STORE.workflowSteps.shouldWeShowDoneAndTalkButton).to.be.true
    })
  })
})
