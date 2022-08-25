import { NextResponse } from 'next/server'

export function middleware(req, event) {
  const { pathname, searchParams } = req.nextUrl
  /*
    Images etc. are served from /projects/assets.
  */
  if (pathname.startsWith('/assets')) {
    return
  }
  /*
    Bypass internal NextJS requests.
  */
  if (pathname.startsWith('/_next')) {
    return
  }
  /*
    Don't redirect or rewrite the health check.
  */
  if (pathname === '/Index') {
    return
  }

  if (searchParams.has('language')) {
    const locale = searchParams.get('language')
    const url = req.nextUrl.clone()
    url.searchParams.delete('language')
    try {
      url.locale = locale
    } catch (error) {
      url.pathname = `/${locale}${pathname}`
    }
    return NextResponse.redirect(url)
  }
}
