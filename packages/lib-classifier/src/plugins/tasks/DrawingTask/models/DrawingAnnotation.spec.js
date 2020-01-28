import DrawingAnnotation from './DrawingAnnotation'
import { Point } from '@plugins/drawingTools/models/marks'

const point = Point.create({ id: 'mockAnnotation', frame: 0, toolIndex: 0, toolType: 'point', x: 100, y: 150 })

const drawingAnnotationSnapshot = {
  task: 'T0',
  taskType: 'drawing',
  value: [ point.id ]
}

describe('Model > DrawingAnnotation', function () {
  it('should exist', function () {
    const drawingAnnotation = DrawingAnnotation.create(drawingAnnotationSnapshot)
    expect(drawingAnnotation).to.exist()
    expect(drawingAnnotation).to.be.an('object')
  })
})
