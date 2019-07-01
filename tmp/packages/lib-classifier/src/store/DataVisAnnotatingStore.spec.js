import DataVisAnnotatingStore from './DataVisAnnotatingStore'

let model

describe('Model > DataVisAnnotatingStore', function () {
  before(function () {
    model = DataVisAnnotatingStore.create()
  })

  it('should exist', function () {
    expect(model).to.be.an('object')
  })

  it('should default the active tool index to the first tool in the tools array', function () {
    expect(model.active).to.equal(0)
  })

  it('should set the active tool index', function () {
    model.setActive(1)
    expect(model.active).to.equal(1)
  })

  it('should reset the active tool to 0 when reset is called', function () {
    model.reset()
    expect(model.active).to.equal(0)
  })
})
