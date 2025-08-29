import { PointTool } from '@plugins/drawingTools/models/tools'

const point = {
  color: '#ff0000',
  label: 'Point',
  max: '10',
  min: 1,
  size: 'small',
  type: 'point'
}

describe('Model > DrawingTools > PointTool', function () {
  it('should exist', function () {
    const pointToolInstance = PointTool.create(point)
    expect(pointToolInstance).toBeDefined()
    expect(pointToolInstance).to.be.an('object')
  })

  it('should have a property `type` of `point`', function () {
    const pointToolInstance = PointTool.create(point)
    expect(pointToolInstance).to.deep.include({ type: 'point' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => PointTool.create({ type: 'purple' })).to.throw()
  })
})
