const proxyquire = require('proxyquire')
const sinon = require('sinon')

const configureNextServer = require('./configure-next-server')

const mockApp = {
  getRequestHandler: () => sinon.spy(),
  setAssetPrefix: sinon.spy()
}

const setCacheHeaders = sinon.spy()

describe('configureNextServer', function () {
  it('should exist', function () {
    expect(configureNextServer).to.be.a('function')
  })

  describe('assetPrefix setting', function () {
    it('should default to an empty string', function () {
      const assetPrefix = ''
      configureNextServer(mockApp)
      const result = mockApp.setAssetPrefix.calledWith(assetPrefix)
      expect(result).to.be.true()
    })

    it('should be set by the `ASSET_PREFIX` environment variable', function () {
      const assetPrefix = 'foobar'
      const configureNextServer = proxyquire('./configure-next-server.js', {
        process: {
          env: {
            ASSET_PREFIX: assetPrefix
          }
        }
      })
      configureNextServer(mockApp)
      const result = mockApp.setAssetPrefix.calledWith(assetPrefix)
      expect(result).to.be.true()
    })
  })

  describe('cache headers setting', function () {
    it(`shouldn't enable cache headers by default`, function () {
      const configureNextServer = proxyquire('./configure-next-server.js', {
        './set-cache-headers': setCacheHeaders
      })
      configureNextServer(mockApp)
      expect(setCacheHeaders.called).to.be.false()
    })

    it(`shouldn't enable cache headers when ENABLE_CACHE_HEADERS isn't 'true'`, function () {
      const configureNextServer = proxyquire('./configure-next-server.js', {
        process: {
          env: {
            ENABLE_CACHE_HEADERS: 'foobar'
          }
        },
        './set-cache-headers': setCacheHeaders
      })
      configureNextServer(mockApp)
      expect(setCacheHeaders.called).to.be.false()
    })

    it(`should enable cache headers when ENABLE_CACHE_HEADERS is 'true'`, function () {
      const configureNextServer = proxyquire('./configure-next-server.js', {
        process: {
          env: {
            ENABLE_CACHE_HEADERS: 'true'
          }
        },
        './set-cache-headers': setCacheHeaders
      })
      configureNextServer(mockApp)
      expect(setCacheHeaders.called).to.be.true()
    })
  })
})
