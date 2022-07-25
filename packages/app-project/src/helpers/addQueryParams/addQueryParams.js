/** Next.js withRouter decorator injects router into components as null in node so we need to explicitly check for falsy values such as path and locale */
/** This helper is used to form ProjectHeader links to PFE pages: Talk, Collections, Recents */

import queryString from 'query-string'

function addQueryParams (href, router, pfe) {
  const path = (router) ? router.asPath : ''
  const locale = (router) ? router.locale : 'en'
  const query = queryString.extract(path)

  let newHref
  if (locale !== 'en' && pfe) {
    newHref = query.length ? `${href}?${query}&language=${locale}` : `${href}?language=${locale}`
  } else {
    newHref = query.length ? `${href}?${query}` : href
  }
  return newHref
}

export default addQueryParams
