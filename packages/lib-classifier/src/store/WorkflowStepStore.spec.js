import sinon from 'sinon'
import WorkflowStepStore from './WorkflowStepStore'

const workflowMock = {
  id: '1',
  tasks: {
    T1: {
      answers: [
        { label: 'yes', next: 'S4' }, // Branching single question task
        { label: 'no', next: 'S2' }
      ],
      type: 'single'
    },
    T2: { },
    T3: { },
    T4: { }
  },
  steps: [
    ['S1', { taskKeys: ['T1'] }]
    ['S2', { taskKeys: ['T2', 'T3'] }],
    ['S3', { taskKeys: ['T4'], next: 'S1' }] // Recursion back to Step 1
    ['S4', { taskKeys: ['summary'] }]
  ]
}

describe.only('Model > WorkflowStepStore', function () {
  it('should exist', function () {
    expect(WorkflowStepStore).to.exist
    expect(WorkflowStepStore).to.be.an('object')
  })

  describe('when instantiated', function () {
    let setStepsAndTasksSpy
    before(function() {
      setStepsAndTasksSpy = sinon.spy(WorkflowStepStore.prototype, 'setStepsAndTasks')
    })
    beforeEach(function() {
      setStepsAndTasksSpy.resetHistory()
    })

    after(function() {
      setStepsAndTasksSpy.restore()
    })

    it('should not call setStepsAndTasks if the workflow does not have defined steps', function () {
      const steps = new Map()
      WorkflowStepStore.create({ id: '2', steps })
      expect(setStepsAndTasksSpy.notCalled).to.be.true
    })
  })
})