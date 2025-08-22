import proxyquire from 'proxyquire'
import sinon from 'sinon'

describe('Server > setLogging', function () {
  let setLogging
  const expressInstance = {
    use: Function.prototype
  }
  const useSpy = sinon.spy(expressInstance, 'use')

  describe('in development', function () {
    before(function () {
      setLogging = proxyquire('./set-logging', {
        process: {
          env: {
            NODE_ENV: 'development'
          }
        }
      })
    })

    afterEach(function () {
      useSpy.resetHistory()
    })

    it(`shouldn't enable morgan`, function () {
      setLogging(expressInstance)
      expect(useSpy).to.have.not.been.called()
    })
  })

  describe('in production', function () {
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
