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
  const { headers, host } = getServerSideAPIHost(env)
  const languages = language === fallback ? fallback : `${language},${fallback}`
  const query = {
    language: languages,
    translated_id,
    translated_type,
    env
  }
  if (translated_id) {
    try {
      const response = await panoptes.get('/translations', query, { ...headers }, host)

      const translation = response.body.translations.find(t => t.language === language)
      const original = response.body.translations.find(t => t.language === fallback)
      return translation || original
    } catch (error) {
      console.error(error)
      logToSentry(error, { query, host })
    }
  } 
  return null
}
