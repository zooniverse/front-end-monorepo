/* This config file is structured for use in the middleware with 'next-i18n-router'*/
import { supportedLocales } from './localeMenu'

const i18nConfig = {
  locales: supportedLocales,
  defaultLocale: 'en',
  localeDetector: false, // Don't detect locale preference in req headers
  prefixDefault: false, // When 'en' don't show prefix in URL
  serverSetCookie: 'never'
}

export default i18nConfig
