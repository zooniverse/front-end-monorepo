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
      const glyph = getDataSeriesSymbol(index)
      expect(glyph).to.equal(glyphComponents[index])
    })
  })
})