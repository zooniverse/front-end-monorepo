import Graph2dRangeXAnnotation from './Graph2dRangeXAnnotation'

const annotation = {
  tool: 0,
  toolType: 'graph2dRangeX',
  x: 100,
  width: 10,
  zoomLevelOnCreation: 1
}

describe('Model > Graph2dRangeXAnnotation', function () {
  it('should exist', function () {
    const annotationInstance = Graph2dRangeXAnnotation.create(annotation)
    expect(annotationInstance).to.be.ok()
    expect(annotationInstance).to.be.an('object')
  })
})
