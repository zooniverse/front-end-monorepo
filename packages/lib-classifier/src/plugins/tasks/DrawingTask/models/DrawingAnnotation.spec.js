import DrawingAnnotation from './DrawingAnnotation'

const drawingAnnotation = {
  task: 'T0',
  value: [{ id: 'mockAnnotation', frame: 0, toolIndex: 0, x: 100, y: 150 }]
}

describe('Model > DrawingAnnotation', function () {
  it('should exist', function () {
    const drawingAnnotationInstance = DrawingAnnotation.create(drawingAnnotation)
    expect(drawingAnnotationInstance).to.exist()
    expect(drawingAnnotationInstance).to.be.an('object')
  })
})
