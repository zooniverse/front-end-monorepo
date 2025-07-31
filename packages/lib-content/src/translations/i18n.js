import i18n from 'i18next'
import {
  initReactI18next,
  Trans as BaseTrans,
  useTranslation as useBaseTranslation
} from 'react-i18next'

import en from './en.json' with { type: "json" }

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

libI18n.addResourceBundle('en', 'translation', en)

/* In FEM there's an i18n instance for each library, and each instance has its own functions.*/
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

export function Trans(props) {
  return <BaseTrans {...props} i18n={libI18n}/>
}

export default i18n
