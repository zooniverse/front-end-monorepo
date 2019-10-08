import { expect } from 'chai'
import Registry from './Registry'

describe('Registry', function () {
  it('should register data', function () {
    const registry = new Registry()
    const testData = { test: 'something' }
    registry.add('testKey', testData)
    expect(registry.get('testKey')).to.equal(testData)
  })

  it('should delete registered data', function () {
    const registry = new Registry()
    const testData = { test: 'something' }
    registry.add('testKey', testData)
    expect(registry.get('testKey')).to.equal(testData)
    registry.remove('testKey')
    expect(registry.get('testKey')).to.be.empty()
  })

  it('should not overwrite an existing key', function () {
    const registry = new Registry()
    const testData = { test: 'something' }
    const newData = { test: 'something else' }
    let errorThrown = false
    registry.add('testKey', testData)
    try {
      registry.add('testKey', newData)
    }
    catch (e) {
      errorThrown = true
      expect(e.message).to.equal('Registry error: key testKey is already registered.')
    }
    expect(errorThrown).to.be.true()
  })

  describe('values()', function () {
    let registry
    const testData = { test: 'something' }
    const newData = { test: 'something else' }

    before(function () {
      registry = new Registry()
      registry.add('testKey', testData)
      registry.add('anotherKey', newData)
    })
    it('should return a list of registered values', function () {
      expect(registry.values()).to.deep.equal([ testData, newData ])
    })

    it('should return a list for the specified property of stored values', function () {
      expect(registry.values('test')).to.deep.equal([ 'something', 'something else' ])
    })
  })
})