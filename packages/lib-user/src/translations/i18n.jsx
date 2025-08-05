import i18n from 'i18next'
import {
  initReactI18next,
  Trans as BaseTrans,
  useTranslation as useBaseTranslation
} from 'react-i18next'

import enKeys from './en.json'

const libUserI18n = i18n.createInstance()
libUserI18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  }
})

libUserI18n.addResourceBundle('en', 'translation', enKeys)

/* In FEM there's an i18n instance for each library, and each instance has its own functions. */
export function useTranslation(ns) {
  return useBaseTranslation(ns, { i18n: libUserI18n })
}

export function Trans(props) {
  return <BaseTrans {...props} i18n={libUserI18n}/>
}

export default i18n
