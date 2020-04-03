import WorkflowConfiguration from './WorkflowConfiguration'

describe('Model > Workflow > WorkflowConfiguration', function () {
  it('should exist', function () {
    expect(WorkflowConfiguration).to.be.an('object')
  })

  describe('default values', function () {
    let model

    before(function () {
      model = WorkflowConfiguration.create()
    })

    it('should be ok', function () {
      expect(model).to.be.ok()
    })
  })
})
