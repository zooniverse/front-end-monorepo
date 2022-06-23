import fetchTranslations from '@helpers/fetchTranslations'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import { logToSentry } from '@helpers/logger'

export default async function fetchProjectPage(project, locale, key, env) {
  const { headers, host } = getServerSideAPIHost(env)
  const page = project.about_pages.find(page => page.url_key === key)
  try {
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
  } catch (error) {
    logToSentry(error)
  }
  return page
}
