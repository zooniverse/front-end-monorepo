import GeoFeedback from '../components/GeoFeedback'
import Graph2dRangeFeedback from '../components/Graph2dRangeFeedback'
import RadialFeedback from '../components/RadialFeedback'

const viewers = {
  geoBox: GeoFeedback,
  geoRadial: GeoFeedback,
  graph2drange: Graph2dRangeFeedback,
  radial: RadialFeedback
}

// Strategies may share a viewer (geoRadial and geoBox both draw on the GeoFeedback
// map), so the rules are deduped by viewer rather than by strategy name.
function getFeedbackViewer (applicableRules) {
  const uniqViewers = new Set(applicableRules.map(rule => viewers[rule.strategy] || null))

  if (uniqViewers.size !== 1) {
    return null
  }

  return [...uniqViewers][0]
}

export default getFeedbackViewer
