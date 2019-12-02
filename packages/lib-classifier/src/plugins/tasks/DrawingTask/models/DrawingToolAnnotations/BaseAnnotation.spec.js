import BaseAnnotation from './BaseAnnotation'

const drawingBaseAnnotation = {
  frame: 0,
  tool: 0
}

describe('Model > Drawing > BaseAnnotation', function () {
  it('should exist', function () {
    const drawingBaseAnnotationInstance = BaseAnnotation.create(drawingBaseAnnotation)
    expect(drawingBaseAnnotationInstance).to.exist()
    expect(drawingBaseAnnotationInstance).to.be.an('object')
  })

  it('should default frame to 0', function () {
    const drawingBaseAnnotationInstance = BaseAnnotation.create()
    expect(drawingBaseAnnotationInstance).to.deep.include({ frame: 0 })
  })

  it('should default tool to 0', function () {
    const drawingBaseAnnotationInstance = BaseAnnotation.create()
    expect(drawingBaseAnnotationInstance).to.deep.include({ tool: 0 })
  })

  it('should throw an error without frame number', function () {
    expect(() => BaseAnnotation.create({ tool: '0' })).to.throw()
  })

  it('should throw an error without tool number', function () {
    expect(() => BaseAnnotation.create({ frame: '0' })).to.throw()
  })
})
