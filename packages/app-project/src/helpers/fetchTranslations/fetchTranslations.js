import { panoptes } from '@zooniverse/panoptes-js'

export default async function fetchTranslations({ translated_id, translated_type, language, env }) {
  const response = await panoptes.get('/translations', {
    language,
    translated_id,
    translated_type,
    env
  })
  const [ translation ] = response.body.translations
  return translation
}