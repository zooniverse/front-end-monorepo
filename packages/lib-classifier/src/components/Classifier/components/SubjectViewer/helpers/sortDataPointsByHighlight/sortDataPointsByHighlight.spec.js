import sortDataPointsByHighlight from "."
import { glyphComponents } from '../getDataSeriesSymbol'
import variableStarData from '../mockLightCurves/variableStar.json'

describe('Helper > sortDataPointsByHighlight', function () {
  const { data } = variableStarData.data.scatterPlot
  const highlightedSeries = [data[0].seriesOptions.label]
  it('should be a function', function () {
    expect(sortDataPointsByHighlight).to.be.a('function')
  })

  it('should throw a TypeError if the dataPoints parameter is undefined', function () {
    expect(function () { sortDataPointsByHighlight() }).to.throw(TypeError)
  })

  it('should throw a TypeError if the seriesPoints parameter is null', function () {
    expect(function () { sortDataPointsByHighlight(null) }).to.throw(TypeError)
  })

  it('should default to return the original dataPoints if there are no highlighted series', function () {
    expect(sortDataPointsByHighlight(data)).to.deep.equal(data)
  })

  it('should return sorted dataPoints by highlight state where unhighlighted series are before the highlighted series', function () {
    const sortedDataPoints = sortDataPointsByHighlight(data, highlightedSeries)
    expect(sortedDataPoints[0]).to.deep.equal(data[1])
    expect(sortedDataPoints[1]).to.deep.equal(data[0])
  })

  it('should set the glyph of each data series based on its original order, before sorting', function () {
    const dataCopy = structuredClone(data)
    const glyphNames = Object.keys(glyphComponents)
    const sortedDataPoints = sortDataPointsByHighlight(dataCopy, highlightedSeries)
    expect(sortedDataPoints[0].seriesOptions.glyph).to.equal(glyphNames[1])
    expect(sortedDataPoints[1].seriesOptions.glyph).to.equal(glyphNames[0])
  })
})
