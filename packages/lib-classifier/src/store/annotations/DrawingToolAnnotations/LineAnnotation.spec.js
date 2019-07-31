import LineAnnotation from './LineAnnotation'

const lineAnnotation = {
  toolType: 'line',
  x1: 200,
  x2: 400,
  y1: 100,
  y2: 150
}

describe('Model > LineAnnotation', function () {
  it('should exist', function () {
    const lineAnnotationInstance = LineAnnotation.create(lineAnnotation)
    expect(lineAnnotationInstance).to.exist()
    expect(lineAnnotationInstance).to.be.an('object')
  })

  it('should have a toolType property of `line`', function () {
    const lineAnnotationInstance = LineAnnotation.create(lineAnnotation)
    expect(lineAnnotationInstance).to.deep.include({ toolType: 'line' })
  })

  it('should throw an error with incorrect toolType property', function () {
    expect(() => LineAnnotation.create({
      toolType: 'purple',
      x1: 200,
      x2: 400,
      y1: 100,
      y2: 150
    })).to.throw()
  })

  it('should throw an error without x1 coordinate', function () {
    expect(() => LineAnnotation.create({
      toolType: 'line',
      x2: 400,
      y1: 100,
      y2: 150
    })).to.throw()
  })

  it('should throw an error without x2 coordinate', function () {
    expect(() => LineAnnotation.create({
      toolType: 'line',
      x1: 200,
      y1: 100,
      y2: 150
    })).to.throw()
  })

  it('should throw an error without y1 coordinate', function () {
    expect(() => LineAnnotation.create({
      toolType: 'line',
      x1: 200,
      x2: 400,
      y2: 150
    })).to.throw()
  })

  it('should throw an error without y2 coordinate', function () {
    expect(() => LineAnnotation.create({
      toolType: 'line',
      x1: 200,
      x2: 400,
      y1: 100
    })).to.throw()
  })
})
