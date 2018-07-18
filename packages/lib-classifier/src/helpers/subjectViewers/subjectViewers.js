const subjectViewers = {}

Object.defineProperty(subjectViewers, 'singleImage', {
  value: 'singleImage',
  enumerable: true
})

// helper for returning subject viewers (e.g. for use in MST enumerable type)
Object.defineProperty(subjectViewers, 'values', {
  value: Object.values(subjectViewers)
})

export default subjectViewers
