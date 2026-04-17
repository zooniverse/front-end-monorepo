import Graph2dRangeFeedback from '../components/Graph2dRangeFeedback'
import RadialFeedback from '../components/RadialFeedback'

const viewers = {
  graph2drange: Graph2dRangeFeedback,
  radial: RadialFeedback
}

function getFeedbackViewer (applicableRules) {
  if (applicableRules.length === 0) {
    return null
  }

  const strategies = applicableRules.map(rule => rule.strategy)
  const uniqStrategies = strategies.filter((strat, index) => {
    return strategies.indexOf(strat) >= index
  })

  if (uniqStrategies.length > 1) {
    return null
  }

  return viewers[[uniqStrategies]] || null
}

export default getFeedbackViewer
