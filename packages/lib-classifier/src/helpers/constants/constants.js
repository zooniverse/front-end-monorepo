const mimeTypesRegexes = {
  application: /^json/,
  audio: /^[mp3|m4a|mpeg]+$/,
  image: /^[jpeg|png|gif]+$/, // Can we deprecate gif support? Should we support svg+xml?
  text: /^plain/,
  video: /^[mp4|mpeg|x\-m4v]+$/
}

export { mimeTypesRegexes }