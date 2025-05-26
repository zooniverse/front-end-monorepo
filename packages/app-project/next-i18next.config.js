/** next-i18next has { useSuspense: false } by default */

/** locales array matches /helpers/localeMenu.js and PFE */
const locales = [
  'ar', // Arabic
  'bn', // Bengali
  'cs', // Czech
  'da', // Danish
  'de', // German
  'el', // Greek
  'en', // English
  'es', // Spanish
  'fr', // French
  'ha', // Hausa
  'he', // Hebrew
  'hi', // Hindi
  'hr', // Croatian
  'hu', // Hungarian
  'hy', // Armenian
  'id', // Indonesian
  'it', // Italian
  'ja', // Japanese
  'kn', // Kannada
  'ko', // Korean
  'mr', // Marathi
  'nl', // Dutch
  'pl', // Polish
  'pt', // Portuguese
  'ru', // Russian
  'sw', // Swahili
  'sv', // Swedish
  'te', // Telugu
  'test', // Test Language
  'tr', // Turkish
  'uk', // Ukrainian
  'ur', // Urdu
  've', // Venda
  'vi', // Vietnamese
  'zh-CN', // Chinese Simplified
  'zh-TW' // Chinese Traditional
]

module.exports = {
  i18n: {
    defaultLocale: 'en',
    defaultNS: 'components',
    locales
  }
}
