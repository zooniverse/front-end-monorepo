import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

/** supportedLngs array matches app-project's next-i18next.config.js */
const supportedLngs = [
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

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  }
})

supportedLngs.forEach(lang => {
  i18n.addResourceBundle(lang, 'translation', require(`./${lang}.json`))
})

export default i18n
