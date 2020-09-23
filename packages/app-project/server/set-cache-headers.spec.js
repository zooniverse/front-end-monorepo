const proxyquire = require('proxyquire')
const sinon = require('sinon')

describe('Server > setCacheHeaders', function () {
  let setCacheHeaders
  const mockRes = {
    setHeader: Function.prototype
  }
  const setHeaderSpy = sinon.spy(mockRes, 'setHeader')

  describe('default behaviour', function () {
    before(function () {
      setCacheHeaders = require('./set-cache-headers')
    })

    afterEach(function () {
      setHeaderSpy.resetHistory()
    })

    it(`shouldn't set any extra headers`, function () {
      setCacheHeaders({ path: '/foo.html' }, mockRes)
      expect(setHeaderSpy).to.have.not.been.called()
    })
  })

  describe('behaviour with caching enabled', function () {
    before(function () {
      setCacheHeaders = proxyquire('./set-cache-headers', {
        process: {
          env: {
            ENABLE_CACHE_HEADERS: 'true'
          }
        }
      })
    })

    afterEach(function () {
      setHeaderSpy.resetHistory()
    })

    it('should set the max-age to 1 minute by default', function () {
      setCacheHeaders({ path: '/foo.html' }, mockRes)
      expect(setHeaderSpy).to.be.calledWith('Cache-Control', 'max-age=60')
    })

    it('should set the max-age to 1 year for `.js` files', function () {
      setCacheHeaders({ path: '/foo.js' }, mockRes)
      expect(setHeaderSpy).to.be.calledWith('Cache-Control', 'max-age=31536000')
    })
  })

  describe('configured behaviour with caching enabled', function () {
    before(function () {
      setCacheHeaders = proxyquire('./set-cache-headers', {
        process: {
          env: {
            DEFAULT_MAX_AGE: '100',
            ENABLE_CACHE_HEADERS: 'true',
            JS_MAX_AGE: '200'
          }
        }
      })
    })

    afterEach(function () {
      setHeaderSpy.resetHistory()
    })

    it('should set the default max-age to the value of `DEFAULT_MAX_AGE`', function () {
      setCacheHeaders({ path: '/foo.html' }, mockRes)
      expect(setHeaderSpy).to.be.calledWith('Cache-Control', 'max-age=100')
    })

    it('should set the max-age for `.js` files to the value of `JS_MAX_AGE`', function () {
      setCacheHeaders({ path: '/foo.js' }, mockRes)
      expect(setHeaderSpy).to.be.calledWith('Cache-Control', 'max-age=200')
    })
  })
})
