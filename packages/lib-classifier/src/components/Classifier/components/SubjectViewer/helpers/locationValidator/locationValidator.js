import { isUri } from 'valid-url'

const mimeTypeRe = /^[-\w+.]+\/[-\w+.]+$/

function locationValidator (propValue, key, componentName, location, propFullName) {
  const subjectLocation = propValue[key]
  const mimeType = Object.keys(subjectLocation)[0]
  const uri = Object.values(subjectLocation)[0]

  if (!mimeTypeRe.test(mimeType) || !isUri(uri)) {
    return new Error(
      'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
    )
  }

  return undefined
}
export default locationValidator
