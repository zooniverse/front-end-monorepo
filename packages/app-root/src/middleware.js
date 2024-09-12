// Note that when internationalization is introduced to app-root,
// this file may need refactoring to handle locale in pathname

import { NextResponse } from 'next/server'

export function middleware(req) {
  /*
    Bypass /assets.
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
  /* This is a temporary mocked env */
  if (req.nextUrl.pathname.startsWith('/mock/wrong')) {
    return NextResponse.redirect(new URL('/mock', req.url))
  }

  /*
    Redirect legacy PFE /about and /get-involved paths to new FEM paths
  */
  if (
    req.nextUrl.pathname.startsWith('/about/acknowledgments') ||
    req.nextUrl.pathname.startsWith('/about/acknowledgements')
  ) {
    return NextResponse.redirect(new URL('/about/resources', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/about/contact')) {
    return NextResponse.redirect(new URL('/about#contact', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/about/highlights')) {
    return NextResponse.redirect(new URL('/about#highlights', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/about/mobile-app')) {
    return NextResponse.redirect(new URL('/about#mobile', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/about/donate')) {
    return NextResponse.redirect(new URL('/get-involved/donate', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/get-involved/call-for-projects')) {
    return NextResponse.redirect(new URL('/get-involved/collaborate', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/get-involved/education')) {
    return NextResponse.redirect(new URL('/get-involved/educate', req.url))
  }

  // There is no root Get Involved page
  if (req.nextUrl.pathname === '/get-involved') {
    return NextResponse.redirect(new URL('/get-involved/volunteer', req.url))
  }

  return NextResponse.next()
}

/* Only care about /about and /get-involved routes */
export const config = {
  matcher: ['/mock/:path*', '/about/:path*', '/get-involved/:paths*']
}
