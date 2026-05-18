import addQueryParams from './addQueryParams'

describe('Helper > addQueryParams', function () {
  describe('when there are no query params', function () {
    it('should return the url unchanged', function () {
      global.dom.reconfigure({
        url: 'https://localhost/foo/bar'
      })
      const url = '/different/page'
      const result = addQueryParams(url)
      expect(result).to.equal(url)
      global.dom.reconfigure({
        url: 'https://localhost'
      })
    })
  })

  describe('when there are env or demo query params', function () {
    it('should return the url with the query parameters added', function () {
      global.dom.reconfigure({
        url: 'https://localhost/foo/bar?env=production&demo=true'
      })
      const url = '/different/page'
      const result = addQueryParams(url)
      expect(result).to.equal(url + '?env=production&demo=true')
      global.dom.reconfigure({
        url: 'https://localhost'
      })
    })
  })

  describe('when there are query params other than demo or env', function () {
    it('should return the url without those params added', function () {
      global.dom.reconfigure({
        url: 'https://localhost/foo/bar?baz=qux&page=4'
      })
      const url = '/different/page'
      const result = addQueryParams(url)
      expect(result).to.equal(url)
      global.dom.reconfigure({
        url: 'https://localhost'
      })
      })
    })
  })
