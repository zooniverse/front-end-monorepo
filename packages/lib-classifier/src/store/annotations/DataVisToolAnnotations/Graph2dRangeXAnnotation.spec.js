import Graph2dRangeXAnnotation from './Graph2dRangeXAnnotation'

const annotation = {
  task: 'T0',
  value: [
    {
      tool: 0,
      x: 100,
      width: 10
    }
  ]
}

describe('Model > Graph2dRangeXAnnotation', function () {
  it('should exist', function () {
    const annotationInstance = Graph2dRangeXAnnotation.create(annotation)
    expect(annotationInstance).to.exist
    expect(annotationInstance).to.be.an('object')
  })
})
