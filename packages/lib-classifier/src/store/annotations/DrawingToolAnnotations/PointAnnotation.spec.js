import PointAnnotation from './PointAnnotation'

const annotation = {
  tool: 0,
  toolType: 'point',
  x: 200,
  y: 100
}

describe('Model > PointAnnotation', function () {
  it('should exist', function () {
    const annotationInstance = PointAnnotation.create(annotation)
    expect(annotationInstance).to.exist
    expect(annotationInstance).to.be.an('object')
  })
})
