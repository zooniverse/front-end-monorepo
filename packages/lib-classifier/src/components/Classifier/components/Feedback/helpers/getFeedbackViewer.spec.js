import getFeedbackViewer from './getFeedbackViewer'

import GeoFeedback from '../components/GeoFeedback'
import Graph2dRangeFeedback from '../components/Graph2dRangeFeedback'
import RadialFeedback from '../components/RadialFeedback'

const graph2dRangeRules = [
  {
    id: 'testRule1-1',
    strategy: 'graph2drange'
  },
  {
    id: 'testRule1-2',
    strategy: 'graph2drange'
  }
]

const radialRules = [
  {
    id: 'testRule2-1',
    strategy: 'radial'
  },
  {
    id: 'testRule2-2',
    strategy: 'radial'
  }
]

describe('Helpers > getFeedbackViewer', function () {
  it('should return the `Graph2dRangeFeedback` component if passed `graph2drange` strategy rules', function () {
    expect(getFeedbackViewer(graph2dRangeRules)).to.equal(Graph2dRangeFeedback)
  })

  it('should return the `RadialFeedback` component if passed `radial` strategy rules', function () {
    expect(getFeedbackViewer(radialRules)).to.equal(RadialFeedback)
  })

  it('should return null if passed rules with a strategy that does not have a feedback viewer', function () {
    const noViewerRules = [
      {
        id: 'testRule3-1',
        strategy: 'noViewerStrategy'
      }
    ]
    expect(getFeedbackViewer(noViewerRules)).to.equal(null)
  })

  it('should return null if no rules', function () {
    expect(getFeedbackViewer([])).to.equal(null)
  })

  it('should return null if multiple strategies', function () {
    const multipleStratRules = graph2dRangeRules.map(rule => ({ ...rule }))
    multipleStratRules[0].strategy = 'column'
    expect(getFeedbackViewer(multipleStratRules)).to.equal(null)
  })

  it('should return the `GeoFeedback` component if passed `geoRadial` and `geoBox` rules together', function () {
    const geoRules = [
      {
        id: 'testRule4-1',
        strategy: 'geoRadial'
      },
      {
        id: 'testRule4-2',
        strategy: 'geoBox'
      }
    ]
    expect(getFeedbackViewer(geoRules)).to.equal(GeoFeedback)
  })

  it('should return null if a strategy with a viewer is mixed with one without', function () {
    const mixedRules = [
      {
        id: 'testRule5-1',
        strategy: 'geoRadial'
      },
      {
        id: 'testRule5-2',
        strategy: 'noViewerStrategy'
      }
    ]
    expect(getFeedbackViewer(mixedRules)).to.equal(null)
  })
})
