import { types } from 'mobx-state-tree'

import WorkflowStepStore from './WorkflowStepStore'
import {
  MultipleChoiceTaskFactory,
  SingleChoiceTaskFactory,
  WorkflowFactory
} from '../../test/factories'

let ROOT_STORE_INSTANCE = null
let WORKFLOW = null

const ROOT_STORE = types
  .model('RootStore', {
    workflows: types.frozen({}),
    workflowSteps: types.optional(WorkflowStepStore, WorkflowStepStore.create()),
  })

describe('Model > WorkflowStepStore', function () {
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
        },
      })

      ROOT_STORE_INSTANCE = ROOT_STORE.create({
        workflows: {
          active: WORKFLOW
        }
      })
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
        },
      })

      ROOT_STORE_INSTANCE = ROOT_STORE.create({
        workflows: {
          active: WORKFLOW
        }
      })
    })

    after(function () {
      ROOT_STORE_INSTANCE = null
      WORKFLOW = null
    })

    it('should convert the tasks to steps and set the steps', function () {
      const { workflowSteps } = ROOT_STORE_INSTANCE
      expect(ROOT_STORE_INSTANCE.workflows.active.steps).to.have.lengthOf(WORKFLOW.steps.length)
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
})
