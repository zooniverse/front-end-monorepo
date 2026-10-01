/* An i18next instance for Vitest env */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enKeys from '../src/translations/en.json'

export const initTranslations = async () => {
  await i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    locales: ['en'],
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: {
      en: { translation: enKeys }
    },
    react: {
      useSuspense: false
    }
  })
}

export default i18n
