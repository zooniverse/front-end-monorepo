import i18n from '@translations/i18n'
import { initReactI18next } from 'react-i18next'
import components from '../../src/translations/en/components.json'

i18n.use(initReactI18next).init({
  lng: 'cimode', // this means the translation functions will simply return the key
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  },
  resources: {
    en: { translation: components }
  }
})

export default i18n
