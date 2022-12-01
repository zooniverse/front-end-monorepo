import i18n from 'i18next'
import { initReactI18next, useTranslation as useBaseTranslation } from 'react-i18next'

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
  'tr',
  'ur',
  'zh-cn',
  'zh-tw'
]

const zrcI18n = i18n.createInstance()
zrcI18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  }
})

supportedLngs.forEach(lang => {
  zrcI18n.addResourceBundle(lang, 'translation', require(`./${lang}.json`))
})

export function useTranslation(ns) {
  return useBaseTranslation(ns, { i18n: zrcI18n })
}
export default zrcI18n
