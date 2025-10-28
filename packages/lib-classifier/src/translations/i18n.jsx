import i18n from 'i18next'
import {
  initReactI18next,
  useTranslation as useBaseTranslation
} from 'react-i18next'

const namespaces = ['components', 'plugins']

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
  'fi', // Finnish
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

const classifierI18n = i18n.createInstance()
classifierI18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  }
})

supportedLngs.forEach((lang) => {
  namespaces.forEach(async (n) => {
    classifierI18n.addResourceBundle(
      lang,
      n,
      await import(`./${lang}/${n}.json`, { assert: { type: 'json' } })
    )
  })
})

export function useTranslation(ns) {
  return useBaseTranslation(ns, { i18n: classifierI18n })
}

export function withTranslation(ns) {
  return (Component) => {
    return function TranslatedComponent(props) {
      const { t } = useTranslation(ns)
      return <Component i18n={classifierI18n} t={t} {...props} />}
  }
}

export default classifierI18n
