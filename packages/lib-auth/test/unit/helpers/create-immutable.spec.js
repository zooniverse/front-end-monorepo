const createImmutable = require('../../../src/helpers/create-immutable')

describe('Unit Tests > helpers > createImmutable', function () {
  it('should set a property on a given object that can\'t be changed', function () {
    const object = {}
    const key = 'foo'
    const value = 'bar'
    createImmutable(object, key, value)
    expect(object[key]).to.equal(value)
    object[key] = 'baz'
    expect(object[key]).to.equal(value)
  })
})
