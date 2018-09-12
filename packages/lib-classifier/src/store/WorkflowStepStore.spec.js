import sinon from 'sinon'
import { getEnv, getSnapshot } from 'mobx-state-tree'

import RootStore from './RootStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'
import WorkflowFactory from '../../test/factories/WorkflowFactory'

describe.only('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.exist
    expect(WorkflowStepStore).to.be.an('object')
  })

  describe('when instantiated', function () {
    it('should not call setStepsAndTasks if there are not defined workflow steps and tasks', function () {
      const workflow = WorkflowFactory.build({ tasks: undefined, steps: undefined })
      const workflowStore = WorkflowStore.create({})
      workflowStore.setResource(workflow)
      workflowStore.setActive(workflow.id)
      const workflowStepInstance = WorkflowStepStore.create({}, { setStepsAndTasks: sinon.spy() })
      const workflowStepInstanceEnv = getEnv(workflowStepInstance)

      RootStore.create({ workflows: workflowStore, steps: workflowStepInstance })

      expect(workflowStepInstanceEnv.setStepsAndTasks.notCalled).to.be.true
    })

    xit('should call setStepsAndTasks if there are defined workflow steps and tasks', function () {
      const workflow = WorkflowFactory.build()
      const workflowStore = WorkflowStore.create({})
      workflowStore.setResource(workflow)
      workflowStore.setActive(workflow.id)

      const workflowInstance = WorkflowStepStore.create({}, { setStepsAndTasks: sinon.spy() })
      const workflowInstanceEnv = getEnv(workflowInstance)
      expect(workflowInstanceEnv.setStepsAndTasks.called).to.be.true
    })
  })
})
