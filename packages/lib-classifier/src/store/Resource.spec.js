import Resource from './Resource'

let resource

const stub = {
  id: '1'
}

describe('Model > Resource', function () {
  before(function () {
    resource = Resource.create(stub)
  })

  after(function () {
    resource = null
  })

  it('should exist', function () {
    expect(Resource).to.not.be.undefined
  })

  it('should have an `id` property', function () {
    expect(resource.id).to.equal(stub.id)
  })
})
