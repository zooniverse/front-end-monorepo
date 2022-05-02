const subjectViewers = {}

Object.defineProperty(subjectViewers, 'dataImage', {
  value: 'dataImage',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'imageAndText', {
  value: 'imageAndText',
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

Object.defineProperty(subjectViewers, 'scatterPlot', {
  value: 'scatterPlot',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'singleImage', {
  value: 'singleImage',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'singleText', {
  value: 'singleText',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'singleVideo', {
  value: 'singleVideo',
  enumerable: true
})

Object.defineProperty(subjectViewers, 'subjectGroup', {
  value: 'subjectGroup',
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
