import { mimeTypeRegexes } from '../constants'

export default function validateMimeType (mimeType) {
  const [type, format] = mimeType.split('/')
  const isMimeTypeValid = mimeTypesRegexes[type].test(format)
  if (!isMimeTypeValid) {
     console.error(`${mimeType} is not valid for use in the classifier.`)
  }

  return isMimeTypeValid
}