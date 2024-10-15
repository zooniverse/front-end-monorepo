import { NextResponse } from 'next/server'

export function middleware(req, event) {
  const url = req.nextUrl.clone()
  const defaultEnv = process.env.PANOPTES_ENV ?? 'staging'
  const panoptesEnv = url.searchParams.get('env') ?? defaultEnv
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
  /*
    Don't redirect or rewrite the status check.
  */
  if (pathname === '/commit_id.txt') {
    return NextResponse.next()
  }

  /*
    Serve /projects/robots.txt as /robots.txt.
  */
  if (pathname === '/robots.txt') {
    url.pathname = '/projects/robots.txt'
    return NextResponse.rewrite(url)
  }

  /*
    Redirect /projects/[owner]/[project]?language=[lang] to /projects/[lang]/[owner]/[project].
  */
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

  /*
    Don't rewrite project URLs that begin with /projects/production
  */
  if (pathname.startsWith('/production')) {
    return NextResponse.next()
  }

  /*
    Don't rewrite project URLs that begin with /projects/staging
  */
  if (pathname.startsWith('/staging')) {
    return NextResponse.next()
  }

  /*
    Rewrite /projects/[owner]/[project] to /projects/production/[owner]/[project].
    Rewrite /projects/[owner]/[project]?env=staging to /projects/staging/[owner]/[project].
  */
  url.pathname = `/${panoptesEnv}${pathname}`

  /*
    Inject the locale, if present, into url.href.
    Is this a bug in Next.js 13? It used to be handled automatically.
  */
  if (url.locale) {
    url.href = `${url.origin}/projects/${url.locale}${url.pathname}`
  }

  return NextResponse.rewrite(url)
}
