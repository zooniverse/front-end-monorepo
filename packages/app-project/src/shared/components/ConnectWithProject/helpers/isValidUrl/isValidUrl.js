import isURL from 'validator/lib/isURL'

export default function isValidUrl (url) {
  return isURL(url)
}
