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

    it('should ignore the hide_classification_summaries flag', function () {
      expect(model.hide_classification_summaries).to.be.undefined()
    })

    it('should have invert_subject as false', function () {
      expect(model.invert_subject).to.be.false()
    })

    it('should persist annotations', function () {
      expect(model.persist_annotations).to.be.true()
    })
  })
})
