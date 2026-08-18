import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '../i18nConfig'

export function middleware(req) {
   return i18nRouter(req, i18nConfig)
}

// runs this function only on requests to pages in our app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
}
