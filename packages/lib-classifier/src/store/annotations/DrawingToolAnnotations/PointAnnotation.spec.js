import { Point } from './PointAnnotation'

const pointAnnotation = {
  toolType: 'point',
  x: 200,
  y: 100
}

describe('Model > PointAnnotation', function () {
  it('should exist', function () {
    const pointAnnotationInstance = Point.create(pointAnnotation)
    expect(pointAnnotationInstance).to.exist()
    expect(pointAnnotationInstance).to.be.an('object')
  })

  it('should have a toolType property of `point`', function () {
    const pointAnnotationInstance = Point.create(pointAnnotation)
    expect(pointAnnotation).to.deep.include({ toolType: 'point' })
  })

  it('should throw an error with incorrect toolType property', function () {
    expect(() => Point.create({ toolType: 'purple', x: 200, y: 100 })).to.throw()
  })

  it('should throw an error without x coordinate', function () {
    expect(() => Point.create({ toolType: 'point', y: 100 })).to.throw()
  })

  it('should throw an error without y coordinate', function () {
    expect(() => Point.create({ toolType: 'point', x: 200 })).to.throw()
  })
})
