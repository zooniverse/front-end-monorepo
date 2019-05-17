const proxyquire = require('proxyquire')
const sinon = require('sinon')

describe('setCacheHeaders', function () {
  const mockRes = {
    setHeader: Function.prototype
  }
  const setHeaderSpy = sinon.spy(mockRes, 'setHeader')

  describe('default behaviour', function () {
    const setCacheHeaders = require('./set-cache-headers')

    it('should set the max-age to 1 minute by default', function () {
      setCacheHeaders({ path: '/foo.html' }, mockRes)
      expect(setHeaderSpy.calledWith('Cache-Control', `max-age=60`)).to.be.true()
    })

    it('should set the max-age to 1 year for `.js` files', function () {
      setCacheHeaders({ path: '/foo.js' }, mockRes)
      expect(setHeaderSpy.calledWith('Cache-Control', `max-age=31536000`)).to.be.true()
    })
  })

  describe('configured behaviour', function () {
    const setCacheHeadersFromEnv = proxyquire('./set-cache-headers', {
      process: {
        env: {
          DEFAULT_MAX_AGE: '100',
          JS_MAX_AGE: '200'
        }
      }
    })

    it('should set the default max-age to the value of `DEFAULT_MAX_AGE`', function () {
      setCacheHeadersFromEnv({ path: '/foo.html' }, mockRes)
      expect(setHeaderSpy.calledWith('Cache-Control', `max-age=100`)).to.be.true()
    })

    it('should set the max-age for `.js` files to the value of `JS_MAX_AGE`', function () {
      setCacheHeadersFromEnv({ path: '/foo.js' }, mockRes)
      expect(setHeaderSpy.calledWith('Cache-Control', `max-age=200`)).to.be.true()
    })
  })
})
