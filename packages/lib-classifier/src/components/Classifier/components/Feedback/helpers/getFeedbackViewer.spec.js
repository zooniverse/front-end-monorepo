import getFeedbackViewer from './getFeedbackViewer'

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
    const multipleStratRules = [ ...graph2dRangeRules ]
    multipleStratRules[0].strategy = 'column'
    expect(getFeedbackViewer(multipleStratRules)).to.equal(null)
  })
})
