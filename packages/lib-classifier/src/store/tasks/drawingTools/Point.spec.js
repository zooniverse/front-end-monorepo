import Point from './Point'

const point = {
  color: '#ff0000',
  label: 'Point',
  max: '10',
  min: 1,
  size: 'small',
  type: 'point'
}

describe('Model > DrawingTools > Point', function () {
  it('should exist', function () {
    const pointToolInstance = Point.create(point)
    expect(pointToolInstance).to.exist()
    expect(pointToolInstance).to.be.an('object')
  })

  it('should have a property `type` of `point`', function () {
    const pointToolInstance = Point.create(point)
    expect(pointToolInstance).to.deep.include({ type: 'point' })
  })

  it('should throw an error with incorrect property `type`', function () {
    expect(() => Point.create({ type: 'purple' })).to.throw()
  })
})
