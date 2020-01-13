import queryString from 'query-string'

function addQueryParams (url, router) {
  // next's withRouter decorator injects router into components as null in node
  // so, a default parameter will be ignored, so we need to explicitly check for falsy values
  const path = (router) ? router.asPath : ''
  const query = queryString.extract(path)
  return query.length ? `${url}?${query}` : url
}

export default addQueryParams
