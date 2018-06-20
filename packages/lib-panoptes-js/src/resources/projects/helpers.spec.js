const { expect } = require('chai')
const { getProjectSlugFromURL, handleError } = require('./helpers')

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

  describe('handleError', function () {
    it('should return a rejected promise with the error message', function () {
      return handleError('oops').catch((error) => {
        expect(error).to.equal('oops')
      })
    })
  })
})
