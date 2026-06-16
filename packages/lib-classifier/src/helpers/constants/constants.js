const mimeTypesRegexes = {
  application: /^json/,
  audio: /^[mp3|m4a|mpeg|wav]+$/, // .wav is only for marywestwood/the-cricket-wing. Not a recommended audio file type due to size.
  image: /^[jpeg|png|gif]+$/, // Can we deprecate gif support? Should we support svg+xml?
  text: /^plain/,
  video: /^[mp4|mpeg|x\-m4v]+$/
}

export { mimeTypesRegexes }
