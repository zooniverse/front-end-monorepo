export function getCookie (name) {
  // process.browser doesn't exist in the jsdom test environment
  if (process.browser || process.env.BABEL_ENV === 'test') {
    if (!name) { return '' }
    const matchingCookies = document.cookie.split(';').filter(cookie => cookie.trim().startsWith(`${name}=`))

    return (matchingCookies[0]) ? matchingCookies[0].split('=')[1] : ''
  }

  return ''
}