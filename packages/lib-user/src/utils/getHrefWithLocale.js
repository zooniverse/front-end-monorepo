export function getHrefWithLocale (href, locale) {
  return locale !== 'en' ? `/${locale}${href}` : href
}
