import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

import i18nConfig from '../../i18nConfig'

const DEFAULT_LOCALE = i18nConfig.defaultLocale // 'en'

export default async function initTranslations(locale, i18nInstance, dictionaries) {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  await i18nInstance.init({
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: i18nConfig.locales,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    resources: dictionaries
    // defaultNS: common,
    // fallbackNS: common,
    // ns: [common]
  })

  return {
    i18n: i18nInstance,
    t: i18nInstance.t
  }
}
