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

  describe('with defined properties', function () {
    const lineStringToolSnapshot = {
      label: 'Dam crest',
      type: 'LineString',
      color: '#00ff00'
    }

    it('should have a color property', function () {
      const tool = LineStringTool.create(lineStringToolSnapshot)
      expect(tool.color).to.equal('#00ff00')
    })

    it('should have a label property', function () {
      const tool = LineStringTool.create(lineStringToolSnapshot)
      expect(tool.label).to.equal('Dam crest')
    })
  })
})
