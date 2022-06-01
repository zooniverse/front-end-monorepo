import useSWR from 'swr'
import { panoptes } from '@zooniverse/panoptes-js'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchTranslations({ translated_id, translated_type, language, fallback = 'en' }) {
  const languages = language === fallback ? fallback : `${language},${fallback}`
  const response = await panoptes.get('/translations', {
    language: languages,
    translated_id,
    translated_type
  })
  const translation = response.body.translations.find(t => t.language === language)
  const original = response.body.translations.find(t => t.language === fallback)
  return translation || original
}

export default function usePanoptesTranslations({ translated_id, translated_type, language }) {
  const key = translated_id ? { translated_id, translated_type, language } : null
  const { data } = useSWR(key, fetchTranslations, SWRoptions)
  return data
}
