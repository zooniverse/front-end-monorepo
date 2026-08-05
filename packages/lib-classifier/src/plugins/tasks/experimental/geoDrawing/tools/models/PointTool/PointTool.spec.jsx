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

  it('should default min to 0', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool.min).to.equal(0)
  })

  it('should default max to 0 (creation disabled)', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool.max).to.equal(0)
  })

  it('should not allow creation by default', function () {
    const tool = PointTool.create({ type: 'Point' })
    expect(tool.canCreate).to.equal(false)
  })

  describe('with defined properties', function () {
    const pointToolSnapshot = {
      label: 'Map Point',
      type: 'Point',
      color: '#ff0000',
      uncertainty_circle: true,
      min: 1,
      max: 3
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

    it('should accept min', function () {
      const tool = PointTool.create(pointToolSnapshot)
      expect(tool.min).to.equal(1)
    })

    it('should accept max', function () {
      const tool = PointTool.create(pointToolSnapshot)
      expect(tool.max).to.equal(3)
    })

    it('should allow creation when max is greater than 0', function () {
      const tool = PointTool.create(pointToolSnapshot)
      expect(tool.canCreate).to.equal(true)
    })
  })

  describe('with point-count bounds as strings (Panoptes JSON)', function () {
    it('should coerce string min to a number', function () {
      const tool = PointTool.create({ type: 'Point', min: '2' })
      expect(tool.min).to.equal(2)
    })

    it('should coerce string max to a number', function () {
      const tool = PointTool.create({ type: 'Point', max: '5' })
      expect(tool.max).to.equal(5)
    })

    it('should fall back to 0 when max is empty string', function () {
      const tool = PointTool.create({ type: 'Point', max: '' })
      expect(tool.max).to.equal(0)
    })

    it('should fall back to 0 when min is empty string', function () {
      const tool = PointTool.create({ type: 'Point', min: '' })
      expect(tool.min).to.equal(0)
    })

    it('should fall back to 0 when max is non-numeric', function () {
      const tool = PointTool.create({ type: 'Point', max: 'abc' })
      expect(tool.max).to.equal(0)
    })

    it('should not allow creation when max coerces to 0', function () {
      const tool = PointTool.create({ type: 'Point', max: '' })
      expect(tool.canCreate).to.equal(false)
    })
  })
})
