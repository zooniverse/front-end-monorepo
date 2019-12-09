import sinon from 'sinon'

import CacheService from './CacheService'

const STORE_FUNCTION = async () => 'result'

describe('API > shared > CacheService', function () {
  it('should exist', function () {
    expect(CacheService).to.be.a('function')
  })

  describe('get method', function () {
    let cache
    let storeFunctionSpy

    before(function () {
      cache = new CacheService(60)
      storeFunctionSpy = sinon.spy(STORE_FUNCTION)
    })

    afterEach(function () {
      storeFunctionSpy.resetHistory()
    })

    it('should call the store function on the first call', async function () {
      const data = await cache.get('r', storeFunctionSpy)
      expect(storeFunctionSpy).to.have.been.calledOnce()
      expect(data).to.equal(await STORE_FUNCTION())
    })

    it('should fetch the result from the cache on subsequent calls', async function () {
      const data = await cache.get('r', storeFunctionSpy)
      expect(storeFunctionSpy).to.have.not.been.called()
      expect(data).to.equal(await STORE_FUNCTION())
    })
  })
})
