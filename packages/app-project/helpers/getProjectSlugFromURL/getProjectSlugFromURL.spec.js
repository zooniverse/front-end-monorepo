import getProjectSlugFromURL from './getProjectSlugFromURL'

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

describe('Helper > getProjectSlugFromURL', function () {
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
