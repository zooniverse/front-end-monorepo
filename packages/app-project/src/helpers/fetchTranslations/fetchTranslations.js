import { panoptes } from '@zooniverse/panoptes-js'

export default async function fetchTranslations({
  translated_id,
  translated_type,
  fallback = 'en',
  language,
  env,
  host
}) {
  const languages = language === fallback ? fallback : `${language},${fallback}`
  if (translated_id) {
    const query = {
      language: languages,
      translated_id,
      translated_type,
      env
    }
    const response = await panoptes.get('/translations', query, {}, host)

    const translation = response.body.translations.find(t => t.language === language)
    const original = response.body.translations.find(t => t.language === fallback)
    return translation || original
  }
  return null
}
