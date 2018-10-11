import sinon from 'sinon'
import { getEnv, getSnapshot } from 'mobx-state-tree'

import ProjectFactory from '../../test/factories/ProjectFactory'
import RootStore from './RootStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'
import WorkflowFactory from '../../test/factories/WorkflowFactory'
import ProjectStore from './ProjectStore';

const project = ProjectFactory.build()

const clientStub = {
  panoptes: {
    get () {
      return Promise.resolve({
        body: {
          projects: [project]
        }
      })
    }
  }
}

describe.only('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.exist
    expect(WorkflowStepStore).to.be.an('object')
  })

  xdescribe('when instantiated', function () {
    it('should not call setStepsAndTasks if there are not defined workflow steps and tasks', function () {
      const setStepsAndTasksSpy = sinon.spy()
      const workflowStepStore = WorkflowStepStore.create({}, { setStepsAndTasks: setStepsAndTasksSpy })
      const workflowStepStoreSnapshot = getSnapshot(workflowStepStore)
      RootStore.create({
        workflowSteps: workflowStepStoreSnapshot
      })

      expect(setStepsAndTasksSpy.notCalled).to.be.true
    })

    xit('should call setStepsAndTasks if there are defined workflow steps and tasks', function () {
      const setStepsAndTasksSpy = sinon.spy()
      const workflow = WorkflowFactory.build()
      // const workflowStore = WorkflowStore.create()
      // workflowStore.setResource(workflow)
      // workflowStore.setActive(workflow.id)
      // const workflowStoreSnapshot = getSnapshot(workflowStore)
      // const workflowStepStore = 
      // const workflowStepStoreSnapshot = getSnapshot(workflowStepStore)
      const rootStore = RootStore.create({
        workflowSteps: WorkflowStepStore.create({}, { setStepsAndTasks: setStepsAndTasksSpy })
      }, { client: clientStub })
      const workflowStoreEnv = getEnv(rootStore.workflows)
      console.log(workflowStoreEnv)
      expect(setStepsAndTasksSpy.calledOnce).to.be.true
    })
  })

  describe('#setStepsAndTasks', function () {
    it('should call setSteps', function () {
      const setStepsSpy = sinon.spy()
      const workflow = WorkflowFactory.build()
      const workflowStepStore = WorkflowStepStore.create()
      // const env = getEnv(workflowStepStore)
      // console.log(env)
      workflowStepStore.setStepsAndTasks(workflow)
      console.log(setStepsSpy)
    })
  })
})