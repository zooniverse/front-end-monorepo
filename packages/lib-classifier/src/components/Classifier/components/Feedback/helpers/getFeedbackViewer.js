import Graph2dRangeFeedback from '../components/Graph2dRangeFeedback'

const viewers = {
  graph2drange: Graph2dRangeFeedback
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
