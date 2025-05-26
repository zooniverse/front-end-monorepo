import i18n from 'i18next'
import { initReactI18next, useTranslation as useBaseTranslation } from 'react-i18next'

/** supportedLngs array matches all other FEM packages and PFE */
const supportedLngs = [
  'ar', // Arabic
  'bn', // Bengali
  'cs', // Czech
  'da', // Danish
  'de', // German
  'el', // Greek
  'en', // English
  'es', // Spanish
  'fr', // French
  'ha', // Hausa
  'he', // Hebrew
  'hi', // Hindi
  'hr', // Croatian
  'hu', // Hungarian
  'hy', // Armenian
  'id', // Indonesian
  'it', // Italian
  'ja', // Japanese
  'kn', // Kannada
  'ko', // Korean
  'mr', // Marathi
  'nl', // Dutch
  'pl', // Polish
  'pt', // Portuguese
  'ru', // Russian
  'sw', // Swahili
  'sv', // Swedish
  'te', // Telugu
  'test', // Test Language
  'tr', // Turkish
  'uk', // Ukrainian
  'ur', // Urdu
  've', // Venda
  'vi', // Vietnamese
  'zh-CN', // Chinese Simplified
  'zh-TW' // Chinese Traditional
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

/* In FEM there's an i18n instance for each library, and each instance has its own useTranslation hook.*/
export function useTranslation(ns) {
  return useBaseTranslation(ns, { i18n: zrcI18n })
}

export default zrcI18n
