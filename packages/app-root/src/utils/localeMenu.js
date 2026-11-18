/*
  locales supported in app-root for platform-level content managed in Lokalise.
*/

const localeMenu = {
  ar: 'العربية', // Arabic
  bn: 'বাংলা', // Bengali
  cs: 'Čeština', // Czech
  da: 'Dansk', // Danish
  de: 'Deutsch', // German
  el: 'Ελληνικά', // Greek
  en: 'English', // English
  es: 'Español', // Spanish
  fi: 'Suomi', // Finnish
  fr: 'Français', // French
  ha: 'Hausa', // Hausa
  he: 'עברית', // Hebrew
  hi: 'हिन्दी', // Hindi
  hr: 'Hrvatski', // Croatian
  hu: 'Magyar', // Hungarian
  hy: 'հայերեն', // Armenian
  id: 'Bahasa Indonesia', // Indonesian
  it: 'Italiano', // Italian
  ja: '日本語', // Japanese
  kn: 'ಕನ್ನಡ', // Kannada
  ko: '한국어', // Korean
  mr: 'मराठी, 𑘦𑘨𑘰𑘙𑘲', // Marathi
  nl: 'Nederlands', // Dutch
  pl: 'Polski', // Polish
  pt: 'Português', // Portuguese
  ru: 'русский', // Russian
  sw: 'Kiswahili', // Swahili
  sv: 'Svenska', // Swedish
  te: 'తెలుగు', // Telugu
  // test: 'Test Language', // Can be used to visually test which text on a page is supposed to be translated.
  tr: 'Türkçe', // Turkish
  uk: 'українська мова', // Ukrainian
  ur: 'اُردُو', // Urdu
  // ve: 'Tshivenḓa', // AI-generated translations are not available in Lokalise, so remove from the supported languages for now.
  vi: 'Tiếng Việt', // Vietnamese
  'zh-CN': '简体中文', // Chinese Simplified
  'zh-TW': '繁體中文' // Chinese Traditional
}

export const supportedLocales = Object.keys(localeMenu)

export default localeMenu
