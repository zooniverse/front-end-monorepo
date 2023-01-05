import { panoptes } from '@zooniverse/panoptes-js'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import { logToSentry } from '@helpers/logger'

export default async function fetchTranslations({
  translated_id,
  translated_type,
  fallback = 'en',
  language,
  env
}) {
  const lowerCaseLang = language?.toLowerCase() // zh-CN and zh-TW are stored as lowercase in panoptes
  const { headers, host } = getServerSideAPIHost(env)
  const languages = language === fallback ? fallback : `${lowerCaseLang},${fallback}`
  const query = {
    language: languages,
    translated_id,
    translated_type,
    env
  }
  if (translated_id) {
    try {
      const response = await panoptes.get('/translations', query, { ...headers }, host)

      const translation = response.body.translations.find(t => t.language === lowerCaseLang)
      const original = response.body.translations.find(t => t.language === fallback)
      return translation || original
    } catch (error) {
      console.error(error)
      logToSentry(error, { query, host })
    }
  }
  return null
}
