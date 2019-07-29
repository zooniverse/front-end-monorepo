import LineAnnotation from './LineAnnotation'

const annotation = {
  toolType: 'line',
  x1: 200,
  x2: 400,
  y1: 100,
  y2: 150
}

describe('Model > LineAnnotation', function () {
  it('should exist', function () {
    const annotationInstance = LineAnnotation.create(annotation)
    expect(annotationInstance).to.exist()
    expect(annotationInstance).to.be.an('object')
  })
})
