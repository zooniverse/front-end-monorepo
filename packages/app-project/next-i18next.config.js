/** next-i18next has { useSuspense: false } by default */

/** locales array matches /helpers/localeMenu.js and PFE's app/locales */

const locales = [
  'ar',
  'cs',
  'de',
  'en',
  'es',
  'fr',
  'he',
  'hi',
  'hr',
  'it',
  'ja',
  'nl',
  'pl',
  'pt',
  'ru',
  'sv',
  'test',
  'ur',
  'zh-cn',
  'zh-tw'
]

module.exports = {
  i18n: {
    defaultLocale: 'en',
    defaultNS: 'components',
    locales
  }
}
