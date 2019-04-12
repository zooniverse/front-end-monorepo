import getFeedbackViewer from './getFeedbackViewer'

import Graph2dRangeFeedback from '../components/Graph2dRangeFeedback'

const rules = [
  {
    id: 'testRule1-1',
    strategy: 'graph2drange'
  },
  {
    id: 'testRule1-2',
    strategy: 'graph2drange'
  }
]

describe('Helpers > getFeedbackViewer', function () {
  it('should return the `Graph2dRangeFeedback` component if passed `graph2drange` strategy rules', function () {
    expect(getFeedbackViewer(rules)).to.equal(Graph2dRangeFeedback)
  })

  it('should return null if no rules', function () {
    expect(getFeedbackViewer([])).to.equal(null)
  })

  it('should return null if multiple strategies', function () {
    const multipleStratRules = rules
    multipleStratRules[0].strategy = 'column'
    expect(getFeedbackViewer(multipleStratRules)).to.equal(null)
  })
})
