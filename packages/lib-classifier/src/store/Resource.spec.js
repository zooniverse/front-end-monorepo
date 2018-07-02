import Resource from './Resource'

let resource

const stub = {
  id: '1'
}

describe('Model > Resource', function () {
  before(function () {
    resource = Resource.create(stub)
  })

  it('should exist', function () {
    expect(Resource).to.not.equal(undefined)
  })

  it('should have an `id` property', function () {
    expect(resource.id).to.equal(stub.id)
  })
})
