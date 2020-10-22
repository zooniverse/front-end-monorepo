const mimeTypesRegexes = {
  application: /^json/,
  audio: /^[mp3|m4a|mpeg]+$/,
  image: /^[jpeg|png|gif]+$/, // Can we deprecate gif support? Should we support svg+xml?
  text: /^plain/,
  video: /^[mp4|mpeg|x\-m4v]+$/
}

<<<<<<< HEAD
export { mimeTypesRegexes }
=======
export { mimeTypesRegexes }
>>>>>>> Finish building out utility function. Update container to use it
