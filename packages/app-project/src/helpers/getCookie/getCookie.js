import cookie from 'cookie'

export default function getCookie (req, name) {
  if (req?.headers?.cookie) {
    const parsedCookie = cookie.parse(req.headers.cookie)
    if (parsedCookie && parsedCookie[name]) {
      return parsedCookie[name]
    }

    return ''
  }

  return ''
}
