import cookie from 'cookie'

export default function getCookie (context, name) {
  if (context && context.req && context.req.headers.cookie) {
    const parsedCookie = cookie.parse(context.req.headers.cookie)
    console.info('parsedCookie', parsedCookie)
    if (parsedCookie && parsedCookie[name]) {
      return parsedCookie[name]
    }

    return ''
  }

  return ''
}
