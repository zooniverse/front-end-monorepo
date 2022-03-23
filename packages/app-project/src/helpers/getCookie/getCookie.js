import cookie from 'cookie'

export default function getCookie (name) {
  if (document?.cookie) {
    const parsedCookie = cookie.parse(document.cookie)
    if (parsedCookie && parsedCookie[name]) {
      return parsedCookie[name]
    }

    return ''
  }

  return ''
}
