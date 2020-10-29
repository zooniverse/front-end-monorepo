const subjectViewers = {}

Object.defineProperty(subjectViewers, 'singleImage', {
  value: 'singleImage',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'lightCurve', {
  value: 'lightCurve',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'multiFrame', {
  value: 'multiFrame',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'subjectGroup', {
  value: 'subjectGroup',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'dataImage', {
  value: 'dataImage',
  enumerable: true
})


Object.defineProperty(subjectViewers, 'variableStar', {
  value: 'variableStar',
  enumerable: true
})


// helper for returning subject viewers (e.g. for use in MST enumerable type)
Object.defineProperty(subjectViewers, 'values', {
  value: Object.values(subjectViewers)
})

export default subjectViewers
