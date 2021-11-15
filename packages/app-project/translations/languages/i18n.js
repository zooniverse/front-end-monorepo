import { dictionary } from './dictionary'

export const useI18n = (locale, useFallback = false) => ({
  translate: (key) => {
    if (!dictionary[locale][key] && !useFallback) {
      throw new Error(`missing translation for ${key} on locale: ${locale}`)
    }

    return !!dictionary[locale][key] ? dictionary[locale][key] : key
  },
})
