export default function getProjectHrefWithLocale (href, locale) {
  return locale !== 'en' ? `/projects/${locale}${href}` : `/projects${href}`
}
