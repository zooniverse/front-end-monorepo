const proxyquire = require('proxyquire')
const sinon = require('sinon')

describe('Server > setAssetPrefix', function () {
  const mockApp = {
    setAssetPrefix: Function.prototype
  }
  const setAssetPrefixSpy = sinon.spy(mockApp, 'setAssetPrefix')

  describe('default behaviour', function () {
    const setAssetPrefix = require('./set-asset-prefix')

    it(`should set the asset prefix to '' by default`, function () {
      setAssetPrefix(mockApp)
      expect(setAssetPrefixSpy).to.be.calledWith('')
    })
  })

  describe('configured behaviour', function () {
    const setAssetPrefixFromEnv = proxyquire('./set-asset-prefix', {
      process: {
        env: {
          ASSET_PREFIX: 'foobar'
        }
      }
    })

    it(`should set the asset prefix to '' by default`, function () {
      setAssetPrefixFromEnv(mockApp)
      expect(setAssetPrefixSpy).to.be.calledWith('foobar')
    })
  })
})
