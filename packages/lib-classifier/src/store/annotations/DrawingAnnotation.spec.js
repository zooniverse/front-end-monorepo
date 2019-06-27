import DrawingAnnotation from './DrawingAnnotation'

const drawingAnnotation = {
  task: 'T0',
  value: []
}

describe('Model > DrawingAnnotation', function () {
  it('should exist', function () {
    const drawingAnnotationInstance = DrawingAnnotation.create(drawingAnnotation)
    expect(drawingAnnotationInstance).to.exist
    expect(drawingAnnotationInstance).to.be.an('object')
  })
})
