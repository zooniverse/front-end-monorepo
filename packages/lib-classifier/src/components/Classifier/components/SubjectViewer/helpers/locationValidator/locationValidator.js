import { isUri } from 'valid-url'

const mimeTypeRe = /^[-\w+.]+\/[-\w+.]+$/

function locationValidator (propValue, key, componentName, location, propFullName) {
  const subjectLocation = propValue[key]
  const { mimeType, url } = subjectLocation

  if (!mimeTypeRe.test(mimeType) || !isUri(url)) {
    return new Error(
      'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
    )
  }

  return undefined
}
export default locationValidator
