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
})
