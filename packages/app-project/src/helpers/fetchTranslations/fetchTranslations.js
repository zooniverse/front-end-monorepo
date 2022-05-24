import { panoptes } from '@zooniverse/panoptes-js'

export default async function fetchTranslations({ translated_id, translated_type, fallback = 'en', language, env }) {
  const languages = language === fallback ? fallback : `${language},${fallback}`
  if (translated_id) {
    const response = await panoptes.get('/translations', {
      language: languages,
      translated_id,
      translated_type,
      env
    })

    const translation = response.body.translations.find(t => t.language === language)
    const original = response.body.translations.find(t => t.language === fallback)
    return translation || original
  }
  return null
}
