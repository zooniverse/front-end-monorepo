import WorkflowStore from './WorkflowStore'

describe('Model > WorkflowStore', function () {
  it('should exist', function () {
    expect(WorkflowStore).to.exist
    expect(WorkflowStore).to.be.an('object')
  })

  it.skip('should fetch a default workflow when the project changes')
})
