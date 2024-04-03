import useSWR from 'swr'
import { panoptes } from '@zooniverse/panoptes-js'
import { mergeWith } from 'lodash'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchTranslations({
  translated_id,
  translated_type,
  language,
  fallback = 'en'
}) {
  const lowerCaseLang = language?.toLowerCase() // zh-CN and zh-TW are stored as lowercase in panoptes
  const languages = language === fallback ? fallback : `${lowerCaseLang},${fallback}`
  const response = await panoptes.get('/translations', {
    language: languages,
    translated_id,
    translated_type
  })

  const translation = response.body.translations.find(t => t.language === lowerCaseLang)
  const original = response.body.translations.find(t => t.language === fallback)

  if (!translation || !Object.keys(translation.strings).length) {
    return original
  }

  /* If a project team leaves part of a language untranslated, backfill it with the strings from the fallback language */
  const customizer = (objValue, srcValue) => objValue === "" ? srcValue : objValue

  const mergedStrings = mergeWith(translation.strings, original.strings, customizer)
  return Object.assign(translation, {strings: mergedStrings})
}

export default function usePanoptesTranslations({
  translated_id,
  translated_type,
  language
}) {
  const key = translated_id
    ? { translated_id, translated_type, language }
    : null
  const { data } = useSWR(key, fetchTranslations, SWRoptions)
  return data
}
