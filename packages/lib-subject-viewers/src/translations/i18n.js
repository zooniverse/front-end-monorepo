import i18n from 'i18next'
import { initReactI18next, useTranslation as useBaseTranslation } from 'react-i18next'

const supportedLngs = [
  'en'
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

/* In FEM there's an i18n instance for each library, and each instance has its own useTranslation hook. */
export function useTranslation (ns) {
  return useBaseTranslation(ns, { i18n: zrcI18n })
}

export default zrcI18n
