import { i18nRouter } from 'next-i18n-router'
import { NextResponse } from 'next/server'
import i18nConfig from '../i18nConfig'

export function middleware(req) {
  // ignore the commit_id.txt for deployment actions
  if (req.nextUrl.pathname.startsWith('/commit_id.txt')) {
    return NextResponse.next()
  }

  // ignore the favicons
  if (req.nextUrl.pathname.startsWith('/favicon.ico')) {
    return NextResponse.next()
  }
  if (req.nextUrl.pathname.startsWith('/icon.svg')) {
    return NextResponse.next()
  }
  if (req.nextUrl.pathname.startsWith('/apple-icon.png')) {
    return NextResponse.next()
  }

  // handle locale prefix
  return i18nRouter(req, i18nConfig)
}

// runs this function only on requests to pages in our app directory
// ignore _next internals
export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)']
}
