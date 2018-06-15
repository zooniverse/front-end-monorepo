const sinon = require('sinon')
const { JSDOM } = require('jsdom')
const { getProjectSlug, getProjectSlugFromURL, handleError } = require('./helpers')

const validUrls = [
  '/projects/foo/bar',
  '/projects/foo/bar/baz',
  '/projects/foo/bar?baz=bing',
  '/projects/foo//bar'
]

const invalidUrls = [
  '/foobar/foo/bar',
  '//projects/foo/bar'
]

describe('Helpers', function () {
  describe('getProjectSlugFromURL', function () {
    it('should return the correct slug from a URL', function () {
      validUrls.forEach(function (url) {
        getProjectSlugFromURL(url).should.equal('foo/bar')
      })
    })

    it('should throw if passed an invalid URL', function () {
      invalidUrls.forEach(function (url) {
        (function () { getProjectSlugFromURL(url) }).should.throw()
      })
    })
  })

  describe('getProjectSlug', function () {
    let jsdom
    const getProjectSlugSpy = sinon.spy(getProjectSlug)
    const getProjectSlugFromURLSpy = sinon.spy(getProjectSlugFromURL)

    afterEach(function () {
      getProjectSlugSpy.resetHistory()
      getProjectSlugFromURLSpy.resetHistory()
    })

    describe('in node', function () {
      it('should return null if slug is not defined in node', function () {
        getProjectSlugSpy()
        expect(getProjectSlugSpy.returned(null)).to.be.true
      })

      it('should return the slug argument if defined and the string doesn\'t include projects', function () {
        const slug = 'zooniverse/my-project'
        getProjectSlugSpy(slug)
        expect(getProjectSlugSpy.returned(slug)).to.be.true
      })

      it('should call getProjectSlugURL if defined and the string includes projects', function () {
        const slug = 'projects/zooniverse/my-project'
        getProjectSlugSpy(slug, getProjectSlugFromURLSpy)
        expect(getProjectSlugFromURLSpy.called).to.be.true
        expect(getProjectSlugFromURLSpy.calledWith(slug)).to.be.true
        expect(getProjectSlugSpy.returned('zooniverse/my-project')).to.be.true
      })
    })

    describe('in browser', function () {
      let jsdom
      before(function () {
        jsdom = new JSDOM('<!doctype html><html><body></body></html>')
        global.window = jsdom.window
        jsdom.reconfigure({ url: 'https://www.zooniverse.org/projects/zooniverse/my-project' })
      })

      after(function () {
        jsdom.reconfigure({ url: 'about:blank' })
        delete global.window
      })

      it('should call getProjectSlugURL if defined and the string includes projects', function() {
        const slug = 'projects/zooniverse/my-project'
        getProjectSlugSpy(slug, getProjectSlugFromURLSpy)
        expect(getProjectSlugFromURLSpy.called).to.be.true
        expect(getProjectSlugFromURLSpy.calledWith(slug)).to.be.true
        expect(getProjectSlugSpy.returned('zooniverse/my-project')).to.be.true
      })

      it('should call getProjectSlugURL using window.location.pathname if slug is not defined', function () {
        getProjectSlugSpy(null, getProjectSlugFromURLSpy)
        expect(getProjectSlugFromURLSpy.called).to.be.true
        expect(getProjectSlugFromURLSpy.calledWith(window.location.pathname)).to.be.true
        expect(getProjectSlugSpy.returned('zooniverse/my-project')).to.be.true
      })
    })
  })

  describe('handleError', function () {
    it('should return a rejected promise with the error message', function () {
      return handleError('oops').catch((error) => {
        expect(error).to.equal('oops')
      })
    })
  })
})