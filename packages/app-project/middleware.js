import { NextResponse } from 'next/server'

export function middleware(req, event) {
  const defaultEnv = process.env.PANOPTES_ENV ?? 'staging'
  const { pathname, searchParams } = req.nextUrl
  const env = searchParams.get('env') ?? defaultEnv

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

  const url = req.nextUrl.clone()

  if (searchParams.has('language')) {
    const locale = searchParams.get('language')
    url.searchParams.delete('language')
    try {
      url.locale = locale
    } catch (error) {
      url.pathname = `/${locale}${pathname}`
    }
    return NextResponse.redirect(url)
  }

  /*
    Project pages are served from /projects/staging/[owner]/[project]
    and /projects/production/[owner]/[project]
  */
  url.pathname = `/${env}${pathname}`
  return NextResponse.rewrite(url)
}
