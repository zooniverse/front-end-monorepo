import getDataSeriesSymbol from './getDataSeriesSymbol'
import glyphComponents from './glyphComponents'

describe('Helper > getDataSeriesSymbol', function () {
  it('should be a function', function () {
    expect(getDataSeriesSymbol).to.be.a('function')
  })

  it('should throw a TypeError if the seriesIndex parameter is undefined', function () {
    expect(function () { getDataSeriesSymbol() }).to.throw(TypeError)
  })

  it('should throw a TypeError if the seriesIndex parameter is null', function () {
    expect(function () { getDataSeriesSymbol(null) }).to.throw(TypeError)
  })

  it('should return a glyph in order of index', function () {
    [1, 2, 3, 4, 5, 6, 7].forEach((arrayItem, index) => {
      const glyph = getDataSeriesSymbol({ seriesIndex: index })
      const glyphName = Object.keys(glyphComponents)[index]
      const expectedGlyph = glyphComponents[glyphName]
      expect(glyph).to.equal(expectedGlyph)
    })
  })

  it('should return a glyph if defined in the series options', function () {
    const glyphNames = Object.keys(glyphComponents)

    glyphNames.forEach((name) => {
      const glyph = getDataSeriesSymbol({ seriesOptions: { glyph: name } })
      expect(glyph).to.equal(glyphComponents[name])
    })
  })
})
