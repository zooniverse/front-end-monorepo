import LineStringTool from './LineStringTool'

describe('Model > LineStringTool', function () {
  it('should exist', function () {
    const tool = LineStringTool.create({ type: 'LineString' })
    expect(tool).to.exist
    expect(tool).to.be.an('object')
  })

  it('should have a type of "LineString"', function () {
    const tool = LineStringTool.create({ type: 'LineString' })
    expect(tool.type).to.equal('LineString')
  })

  it('should default color to empty string', function () {
    const tool = LineStringTool.create({ type: 'LineString' })
    expect(tool.color).to.equal('')
  })

  it('should default label to empty string', function () {
    const tool = LineStringTool.create({ type: 'LineString' })
    expect(tool.label).to.equal('')
  })

  it('should default min_vertices to 2', function () {
    const tool = LineStringTool.create({ type: 'LineString' })
    expect(tool.min_vertices).to.equal(2)
  })

  it('should default max_vertices to undefined (no upper bound)', function () {
    const tool = LineStringTool.create({ type: 'LineString' })
    expect(tool.max_vertices).to.equal(undefined)
  })

  describe('with defined properties', function () {
    const lineStringToolSnapshot = {
      label: 'Dam crest',
      type: 'LineString',
      color: '#00ff00',
      min_vertices: 3,
      max_vertices: 10
    }

    it('should have a color property', function () {
      const tool = LineStringTool.create(lineStringToolSnapshot)
      expect(tool.color).to.equal('#00ff00')
    })

    it('should have a label property', function () {
      const tool = LineStringTool.create(lineStringToolSnapshot)
      expect(tool.label).to.equal('Dam crest')
    })

    it('should accept min_vertices', function () {
      const tool = LineStringTool.create(lineStringToolSnapshot)
      expect(tool.min_vertices).to.equal(3)
    })

    it('should accept max_vertices', function () {
      const tool = LineStringTool.create(lineStringToolSnapshot)
      expect(tool.max_vertices).to.equal(10)
    })
  })

  describe('with vertex bounds as strings (Panoptes JSON)', function () {
    it('should coerce string min_vertices to a number', function () {
      const tool = LineStringTool.create({ type: 'LineString', min_vertices: '3' })
      expect(tool.min_vertices).to.equal(3)
    })

    it('should coerce string max_vertices to a number', function () {
      const tool = LineStringTool.create({ type: 'LineString', max_vertices: '10' })
      expect(tool.max_vertices).to.equal(10)
    })

    it('should fall back to undefined when max_vertices is empty string', function () {
      const tool = LineStringTool.create({ type: 'LineString', max_vertices: '' })
      expect(tool.max_vertices).to.equal(undefined)
    })

    it('should fall back to the default min_vertices when min_vertices is empty string', function () {
      const tool = LineStringTool.create({ type: 'LineString', min_vertices: '' })
      expect(tool.min_vertices).to.equal(2)
    })

    it('should fall back to undefined when max_vertices is non-numeric', function () {
      const tool = LineStringTool.create({ type: 'LineString', max_vertices: 'abc' })
      expect(tool.max_vertices).to.equal(undefined)
    })
  })
})
