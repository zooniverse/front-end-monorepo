function addQueryParams(url) {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return url

  const { hostname } = new URL(url, window.location.href)
  const isZooniverse = hostname === window.location.hostname || hostname.endsWith('zooniverse.org')
  if (!isZooniverse) return url

  const query = new URLSearchParams(window.location.search)
  const env = query.get('env')
  const demo = query.get('demo')

  const newSearch = {
    env,
    demo
  }

  const filtered = Object.fromEntries(
    Object.entries(newSearch).filter(([_, value]) => value !== null)
  )
  const newQueryParams = new URLSearchParams(filtered).toString()

  if (newQueryParams?.length) {
    return `${url}?${newQueryParams}`
  } else {
    return url
  }
}

export default addQueryParams
