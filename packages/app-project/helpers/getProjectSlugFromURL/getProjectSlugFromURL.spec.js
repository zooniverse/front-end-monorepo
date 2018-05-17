import getProjectSlugFromURL from './getProjectSlugFromURL'

const relativeUrls = [
  '/projects/foo/bar',
  '/projects/foo/bar/classify'
]

const absoluteUrls = [
  'http://www.zooniverse.org/projects/foo/bar',
  'http://www.zooniverse.org/projects/foo/bar/classify',
  'https://www.zooniverse.org/projects/foo/bar',
  'https://www.zooniverse.org/projects/foo/bar/classify'
]

describe('Helper > getProjectSlugFromURL', function () {
  it('should return the correct slug from a relative URL', function () {
    relativeUrls.forEach(function (url) {
      getProjectSlugFromURL(url).should.equal('foo/bar')
    })
  })

  it('should return the correct slug from an absolute URL', function () {
    absoluteUrls.forEach(function (url) {
      getProjectSlugFromURL(url).should.equal('foo/bar')
    })
  })
})
