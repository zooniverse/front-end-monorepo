import PointTool from './PointTool'

describe('Model > PointTool', function () {
  it('should exist', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool).to.exist
    expect(tool).to.be.an('object')
  })

  it('should have a type of "Point"', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool.type).to.equal('Point')
  })

  it('should default color to empty string', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool.color).to.equal('')
  })

  it('should default label to empty string', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool.label).to.equal('')
  })

  it('should default uncertainty_circle to false', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool.uncertainty_circle).to.equal(false)
  })

  describe('with defined properties', function () {
    const pointToolSnapshot = {
      label: 'Map Point',
      type: 'Point',
      color: '#ff0000',
      uncertainty_circle: true
    }

    it('should have a color property', function () {
      const tool = PointTool.create(pointToolSnapshot)
      expect(tool.color).to.equal('#ff0000')
    })

    it('should have a label property', function () {
      const tool = PointTool.create(pointToolSnapshot)
      expect(tool.label).to.equal('Map Point')
    })
    
    it('should have uncertainty_circle of true', function () {
      const tool = PointTool.create(pointToolSnapshot)
      expect(tool.uncertainty_circle).to.equal(true)
    })
  })
})
