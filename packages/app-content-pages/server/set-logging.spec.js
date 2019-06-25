const proxyquire = require('proxyquire')
const sinon = require('sinon')

describe('Server > setLogging', function () {
  let setLogging
  const expressInstance = {
    use: Function.prototype
  }
  const useSpy = sinon.spy(expressInstance, 'use')

  describe('default behaviour', function () {
    before(function () {
      setLogging = require('./set-logging')
    })

    afterEach(function () {
      useSpy.resetHistory()
    })

    it(`shouldn't enable morgan`, function () {
      setLogging(expressInstance)
      expect(useSpy).to.have.not.been.called()
    })
  })

  describe('production behaviour', function () {
    before(function () {
      setLogging = proxyquire('./set-logging', {
        process: {
          env: {
            NODE_ENV: 'production'
          }
        }
      })
    })

    afterEach(function () {
      useSpy.resetHistory()
    })

    it('should enable morgan', function () {
      setLogging(expressInstance)
      expect(useSpy).to.have.been.called()
    })
  })
})
