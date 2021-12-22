import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import fr from './fr.json'

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  resources: {
    en,
    fr
  }
})

export default i18n
