import i18n from 'i18next'
import {
  initReactI18next,
  useTranslation as useBaseTranslation
} from 'react-i18next'

const libI18n = i18n.createInstance()
libI18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  }
})

libI18n.addResourceBundle('en', 'translation', require('./en.json'))

export function useTranslation(ns) {
  return useBaseTranslation(ns, { i18n: libI18n })
}

export function withTranslation(ns) {
  return Component => {
    return function TranslatedComponent(props) {
      const { t } = useTranslation(ns)
      return <Component i18n={libI18n} t={t} {...props} />
    }
  }
}

export default libI18n
