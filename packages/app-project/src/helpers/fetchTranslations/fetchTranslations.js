import { panoptes } from '@zooniverse/panoptes-js'
import { mergeWith } from 'lodash'

import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import logToSentry from '@helpers/logger/logToSentry.js'

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

      if (!translation || !Object.keys(translation.strings).length) {
        return original
      }

      /* If a project team leaves part of a language untranslated, backfill it with the strings from the fallback language */
      const customizer = (objValue, srcValue) => objValue === "" ? srcValue : objValue

      const mergedStrings = mergeWith(translation.strings, original.strings, customizer)
      return Object.assign(translation, {strings: mergedStrings})
        } catch (error) {
      console.error(error)
      logToSentry(error, { query, host })
    }
  }
  return null
}
