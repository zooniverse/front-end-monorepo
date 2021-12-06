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
    Project pages are served from /projects/staging/[owner]/[project]
    and /projects/production/[owner]/[project]
  */
  return NextResponse.rewrite(`/${env}${pathname}`)
}