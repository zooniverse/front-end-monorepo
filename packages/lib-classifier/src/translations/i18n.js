import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const supportedLngs = ['en']
const namespaces = ['components', 'plugins']

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false
  }
})

supportedLngs.forEach((lang) => {
  namespaces.forEach((n) => {
    i18n.addResourceBundle(
      lang,
      n,
      require(`@translations/${lang}/${n}.json`)
    )
  })
})

export default i18n
