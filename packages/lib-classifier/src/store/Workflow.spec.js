import Workflow from './Workflow'

describe('Model > Workflow', function () {
  it('should exist', function () {
    expect(Workflow).to.be.an('object')
  })

  describe('default settings', function () {
    let workflow

    before(function () {
      workflow = Workflow.create({
        id: 'workflow1',
        display_name: 'A test workflow',
        version: '0.0'
      })
    })

    it('should not be grouped', function () {
      expect(workflow.grouped).to.be.false()
    })
  })
})
