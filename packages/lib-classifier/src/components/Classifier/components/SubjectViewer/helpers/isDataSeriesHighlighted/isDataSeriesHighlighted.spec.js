import { expect } from 'chai'
import isDataSeriesHighlighted from './isDataSeriesHighlighted'

describe('Helper > isDataSeriesHighlighted', function () {
  it('should be a function', function () {
    expect(isDataSeriesHighlighted).to.be.a('function')
  })

  it('should default to return true', function () {
    expect(isDataSeriesHighlighted()).to.be.true()
  })

  it('should return the highlight state of the series parameters when only one is highlighted', function () {
    const highlightedSeries = [ 'foo' ]
    const firstSeriesHighlightState = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: { label: 'foo' } })
    const secondSeriesHighlightState = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: { label: 'bar' } })
    expect(firstSeriesHighlightState).to.be.true()
    expect(secondSeriesHighlightState).to.be.false()
  })

  it('should return the highlight state of the series parameters when none is highlighted', function () {
    const highlightedSeries = []
    const firstSeriesHighlightState = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: { label: 'foo' } })
    const secondSeriesHighlightState = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: { label: 'bar' } })
    expect(firstSeriesHighlightState).to.be.false()
    expect(secondSeriesHighlightState).to.be.false()
  })

  it('should return the highlight state of the series parameters when all are highlighted', function () {
    const highlightedSeries = ['foo', 'bar']
    const firstSeriesHighlightState = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: { label: 'foo' } })
    const secondSeriesHighlightState = isDataSeriesHighlighted({ highlightedSeries, seriesOptions: { label: 'bar' } })
    expect(firstSeriesHighlightState).to.be.true()
    expect(secondSeriesHighlightState).to.be.true()
  })
})