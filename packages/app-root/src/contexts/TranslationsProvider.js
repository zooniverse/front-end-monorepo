'use client'

import { I18nextProvider } from 'react-i18next'
import initTranslations from '@/utils/i18n'
import { createInstance } from 'i18next'

export default function TranslationsProvider({ children, locale }) {
  const i18nInstance = createInstance()

  initTranslations(locale, i18nInstance)

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
