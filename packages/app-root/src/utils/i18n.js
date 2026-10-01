import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import i18nConfig from '../../i18nConfig'

import { enKeys, testKeys } from '@zooniverse/content'
import { enUserTranslations, testUserTranslations } from '@zooniverse/user'

export default async function initTranslations(locale, i18nInstance) {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  await i18nInstance.init({
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale, // 'en'
    supportedLngs: i18nConfig.locales,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    // defaultNS: 'common',
    // fallbackNS: 'common',
    // ns: ['common']
    // preload: resources ? [] : i18nConfig.locales
    resources: {
      en: { translation: { ...enKeys, ...enUserTranslations } },
      test: { translation: { ...testKeys, ...testUserTranslations } }
    }
  })

  return {
    i18n: i18nInstance,
    t: i18nInstance.t
  }
}
