import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

import i18nConfig from '../../i18nConfig'

export default async function initTranslations(locale, i18nInstance, dictionary) {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  await i18nInstance.init({
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale, // en
    supportedLngs: i18nConfig.locales,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    // Syntax required by i18next --> en: { translation: { ...dictionaries } }
    resources: { [locale]: { translation: dictionary } }
    // defaultNS: common,
    // fallbackNS: common,
    // ns: [common]
  })

  return {
    i18n: i18nInstance,
    t: i18nInstance.t
  }
}
