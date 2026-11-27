/**
  Add the env and demo query params of the current page to a link, plus any
  `params` (such as { language: 'es' } for a link to PFE). Params with a null
  or undefined value are left out.
*/
function addQueryParams(url, params = {}) {
  const isBrowser = typeof window !== 'undefined'
  const query = isBrowser ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const env = query.get('env')
  const demo = query.get('demo')

  const newSearch = {
    env,
    demo,
    ...params
  }

  const filtered = Object.fromEntries(
    Object.entries(newSearch).filter(([_, value]) => value !== null && value !== undefined)
  )
  const newQueryParams = new URLSearchParams(filtered).toString()

  if (newQueryParams?.length) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}${newQueryParams}`
  } else {
    return url
  }
}

export default addQueryParams
