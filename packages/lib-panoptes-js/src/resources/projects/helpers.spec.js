import { getProjectSlugFromURL } from './helpers'

const validUrls = [
  '/projects/foo/bar',
  '/projects/foo/bar/baz',
  '/projects/foo/bar?baz=bing',
  '/projects/foo//bar'
]

const invalidUrls = [
  '/foobar/foo/bar',
  '/subjects/foo/bar'
]

describe('Projects Helpers', function () {
  describe('getProjectSlugFromURL', function () {
    it('should return the correct slug from a URL', function () {
      validUrls.forEach(function (url) {
        expect(getProjectSlugFromURL(url)).to.equal('foo/bar')
      })
    })

    it('should throw if passed an invalid URL', function () {
      invalidUrls.forEach(function (url) {
        expect(function () {
          getProjectSlugFromURL(url)
        }).to.throw()
      })
    })
  })
})
