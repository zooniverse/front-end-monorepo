import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  resources: {
    en
  }
})

export default i18n
