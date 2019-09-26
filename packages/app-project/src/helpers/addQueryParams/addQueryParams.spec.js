import addQueryParams from './addQueryParams'

const ROUTER_WITH_QUERY = {
  asPath: '/foo/bar?baz=qux&page=4'
}

const ROUTER_WITHOUT_QUERY = {
  asPath: '/foo/bar'
}

describe('Helper > addQueryParams', function () {
  describe('when there are no query params', function () {
    it('should return the url unchanged', function () {
      const url = '/different/page'
      const result = addQueryParams(url, ROUTER_WITHOUT_QUERY)
      expect(result).to.equal(url)
    })
  })
  describe('when there are query params', function () {
    it('should return the url with the query parameters added', function () {
      const url = '/different/page'
      const result = addQueryParams(url, ROUTER_WITH_QUERY)
      expect(result).to.equal(url + '?baz=qux&page=4')
    })
  })
})
