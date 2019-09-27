import queryString from 'query-string'

function addQueryParams (url, router) {
  const { asPath } = router
  const query = queryString.extract(asPath)
  return query.length ? `${url}?${query}` : url
}

export default addQueryParams
