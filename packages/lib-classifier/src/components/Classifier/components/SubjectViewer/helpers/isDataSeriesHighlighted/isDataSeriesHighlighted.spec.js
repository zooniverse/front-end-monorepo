import isDataSeriesHighlighted from './isDataSeriesHighlighted'

describe('Helper > isDataSeriesHighlighted', function () {
  it('should be a function', function () {
    expect(isDataSeriesHighlighted).to.be.a('function')
  })

  it('should default to return true', function () {
    expect(isDataSeriesHighlighted()).to.be.true()
  })

  it('should return the highlight state of the series parameters', function () {
    const highlightedSeries = [{ foo: true }, { bar: false }]
    const firstSeriesHighlightState = isDataSeriesHighlighted(highlightedSeries, 0)
    const secondSeriesHighlightState = isDataSeriesHighlighted(highlightedSeries, 1)
    expect(firstSeriesHighlightState).to.be.true()
    expect(secondSeriesHighlightState).to.be.false()
  })
})