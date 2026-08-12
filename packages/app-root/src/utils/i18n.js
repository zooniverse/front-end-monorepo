import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import i18nConfig from '../../i18nConfig'

/*
  There are no language dictionaries in app-root, but if added in
  the future, handle them as `resources` below and adjust namespaces.
*/

export default async function initTranslations(locale, i18nInstance) {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  await i18nInstance.init({
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale, // 'en'
    supportedLngs: i18nConfig.locales,
    // defaultNS: 'common',
    // fallbackNS: 'common',
    // ns: ['common']
    // preload: resources ? [] : i18nConfig.locales
    // resources : [],
  })

  return {
    i18n: i18nInstance,
    // resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t
  }
}
