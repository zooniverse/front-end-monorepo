import Resource from './Resource'

let model

const stub = {
  id: '1'
}

describe('Model > Resource', function () {
  it('should exist', function () {
    expect(Resource).to.not.be.undefined
  })

  describe('properties', function () {
    before(function () {
      model = Resource.create(stub)
    })

    after(function () {
      model = null
    })

    it('should have an `id` property', function () {
      expect(model.id).to.equal(stub.id)
    })
  })
})
