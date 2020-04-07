const mimeTypesRegexes = {
  application: /^json/,
  audio: /^[mp3|m4a|mpeg]+$/,
  image: /^[jpeg|png|gif]+$/, // Can we deprecate gif support? Should we support svg+xml?
  text: /^plain/,
  video: /^[mp4|mpeg|x\-m4v]+$/
}

export default function validateMimeType (mimeType) {
  const [type, format] = mimeType.split('/')
  const isMimeTypeValid = mimeTypesRegexes[type].test(format)
  if (!isMimeTypeValid) {
     console.error(`${mimeType} is not valid for use in the classifier.`)
  }

  return isMimeTypeValid
}