import fetchTranslations from '@helpers/fetchTranslations'

export default async function fetchProjectPage(project, locale, key, env) {
  const page = project.about_pages.find(page => page.url_key === key)
  const translations = await fetchTranslations({
    translated_id: page?.id,
    translated_type: 'project_page',
    fallback: project.primary_language,
    language: locale,
    env
  })
  if (translations?.strings) {
    page.strings = translations.strings
  }
  return page
}
