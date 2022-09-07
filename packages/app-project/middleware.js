import { NextResponse } from 'next/server'

export function middleware(req, event) {
  const url = req.nextUrl.clone()
  const defaultEnv = process.env.PANOPTES_ENV ?? 'staging'
  const env = url.searchParams.get('env') ?? defaultEnv
  /*
    NextJS 12.2.5 includes the base path and locale in req.nextUrl.pathname.
    This might be a bug, but remove those for now.
  */
  const pathname = url.pathname.replace(`/projects/${url.locale}`, '')

  /*
    Images etc. are served from /projects/assets.
  */
  if (pathname.startsWith('/assets')) {
    return NextResponse.next()
  }
  /*
    Bypass internal NextJS requests.
  */
  if (pathname.startsWith('/_next')) {
    return NextResponse.next()
  }
  /*
    Don't redirect or rewrite the health check.
  */
  if (pathname === '/Index') {
    return NextResponse.next()
  }

  if (url.searchParams.has('language')) {
    const locale = url.searchParams.get('language')
    url.searchParams.delete('language')
    try {
      url.locale = locale
    } catch (error) {
      url.pathname = `/${locale}${pathname}`
    }
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith('/production')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/staging')) {
    return NextResponse.next()
  }

  /*
    Project pages are served from /projects/staging/[owner]/[project]
    and /projects/production/[owner]/[project]
  */
  url.pathname = `/${env}${pathname}`
  return NextResponse.rewrite(url)
}
