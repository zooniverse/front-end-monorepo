function addQueryParams(url) {
  const isBrowser = typeof window !== 'undefined'
  const query = isBrowser ? new URLSearchParams(window.location.search).toString() : ''
  return query.length ? `${url}?${query}` : url
}

export default addQueryParams
