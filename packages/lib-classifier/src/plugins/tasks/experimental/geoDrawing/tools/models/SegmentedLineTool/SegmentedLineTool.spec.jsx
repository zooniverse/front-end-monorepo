import SegmentedLineTool from './SegmentedLineTool'

describe('Model > SegmentedLineTool', function () {
  it('should exist', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool).to.exist
    expect(tool).to.be.an('object')
  })

  it('should have a type of "SegmentedLine"', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool.type).to.equal('SegmentedLine')
  })

  it('should default color to empty string', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool.color).to.equal('')
  })

  it('should default label to empty string', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool.label).to.equal('')
  })

  it('should default min_vertices to 2', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool.min_vertices).to.equal(2)
  })

  it('should default max_vertices to undefined (no upper bound)', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool.max_vertices).to.equal(undefined)
  })

  it('should default min to 0', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool.min).to.equal(0)
  })

  it('should default max to undefined (no upper bound)', function () {
    const tool = SegmentedLineTool.create({ type: 'SegmentedLine' })
    expect(tool.max).to.equal(undefined)
  })

  describe('with defined properties', function () {
    const segmentedLineToolSnapshot = {
      label: 'Dam crest',
      type: 'SegmentedLine',
      color: '#00ff00',
      min_vertices: 3,
      max_vertices: 10,
      min: 1,
      max: 5
    }

    it('should have a color property', function () {
      const tool = SegmentedLineTool.create(segmentedLineToolSnapshot)
      expect(tool.color).to.equal('#00ff00')
    })

    it('should have a label property', function () {
      const tool = SegmentedLineTool.create(segmentedLineToolSnapshot)
      expect(tool.label).to.equal('Dam crest')
    })

    it('should accept min_vertices', function () {
      const tool = SegmentedLineTool.create(segmentedLineToolSnapshot)
      expect(tool.min_vertices).to.equal(3)
    })

    it('should accept max_vertices', function () {
      const tool = SegmentedLineTool.create(segmentedLineToolSnapshot)
      expect(tool.max_vertices).to.equal(10)
    })

    it('should accept min', function () {
      const tool = SegmentedLineTool.create(segmentedLineToolSnapshot)
      expect(tool.min).to.equal(1)
    })

    it('should accept max', function () {
      const tool = SegmentedLineTool.create(segmentedLineToolSnapshot)
      expect(tool.max).to.equal(5)
    })
  })

  describe('with vertex bounds as strings (Panoptes JSON)', function () {
    it('should coerce string min_vertices to a number', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', min_vertices: '3' })
      expect(tool.min_vertices).to.equal(3)
    })

    it('should coerce string max_vertices to a number', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', max_vertices: '10' })
      expect(tool.max_vertices).to.equal(10)
    })

    it('should fall back to undefined when max_vertices is empty string', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', max_vertices: '' })
      expect(tool.max_vertices).to.equal(undefined)
    })

    it('should fall back to the default min_vertices when min_vertices is empty string', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', min_vertices: '' })
      expect(tool.min_vertices).to.equal(2)
    })

    it('should fall back to undefined when max_vertices is non-numeric', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', max_vertices: 'abc' })
      expect(tool.max_vertices).to.equal(undefined)
    })
  })

  describe('with line-count bounds as strings (Panoptes JSON)', function () {
    it('should coerce string min to a number', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', min: '3' })
      expect(tool.min).to.equal(3)
    })

    it('should coerce string max to a number', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', max: '5' })
      expect(tool.max).to.equal(5)
    })

    it('should fall back to undefined when max is empty string', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', max: '' })
      expect(tool.max).to.equal(undefined)
    })

    it('should fall back to the default min when min is empty string', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', min: '' })
      expect(tool.min).to.equal(0)
    })

    it('should fall back to undefined when max is non-numeric', function () {
      const tool = SegmentedLineTool.create({ type: 'SegmentedLine', max: 'abc' })
      expect(tool.max).to.equal(undefined)
    })
  })
})
