import RectangleTool from './RectangleTool'

const rectangle = {
  color: '#ff0000',
  label: 'A Square With Unequal Sides',
  max: 2,
  min: 1,
  type: 'rectangle'
}

describe('Model > DrawingTools > Rectangle', function () {
  it('should exist', function () {
    const rectangleToolInstance = RectangleTool.create(rectangle)
    expect(rectangleToolInstance).to.exist
    expect(rectangleToolInstance).to.be.an('object')
  })

  it('should have a property `type` of `rectangle`', function () {
    const rectangleToolInstance = RectangleTool.create(rectangle)
    expect(rectangleToolInstance).to.deep.include({ type: 'rectangle' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => RectangleTool.create({ type: 'wakka wakka wakka' })).to.throw()
  })
})
