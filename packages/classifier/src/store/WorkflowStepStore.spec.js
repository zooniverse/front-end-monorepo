import sinon from 'sinon'
import { getEnv } from 'mobx-state-tree'
import WorkflowStepStore from './WorkflowStepStore'

// const workflowMock = {
//   id: '1',
//   tasks: {
//     T1: {
//       answers: [
//         { label: 'yes', next: 'S4' }, // Branching single question task
//         { label: 'no', next: 'S2' }
//       ],
//       type: 'single'
//     },
//     T2: {},
//     T3: {},
//     T4: {}
//   },
//   steps: [
//     ['S1', { taskKeys: ['T1'] }]
//     ['S2', { taskKeys: ['T2', 'T3'] }],
//     ['S3', { taskKeys: ['T4'], next: 'S1' }] // Recursion back to Step 1
//     ['S4', { taskKeys: ['summary'] }]
//   ]
// }

describe('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.exist
    expect(WorkflowStepStore).to.be.an('object')
  })

  xdescribe('when instantiated', function () {
    let setStepsAndTasksSpy
    before(function () {
      setStepsAndTasksSpy = sinon.spy()
      WorkflowStepStore.actions(() => {
        setStepsAndTasks: setStepsAndTasksSpy
      })
    })

    afterEach(function () {
      setStepsAndTasksSpy.resetHistory()
    })

    it('should not call setStepsAndTasks if there are not defined steps', function () {
      WorkflowStepStore.create()
      expect(setStepsAndTaskSpy.notCalled).to.be.true
    })

    it('should not call setStepsAndTasks if there are not defined tasks', function () {
      const steps = new Map()
      steps.set('S1', { taskKeys: ['T1'] })

      expect(setStepsAndTaskSpy.notCalled).to.be.true
    })
  })
})
