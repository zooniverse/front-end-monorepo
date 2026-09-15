import getPointFeatures from '../get-point-features'
import localMeters from '../local-meters'

function isFeatureWithinTolerance (rule, feature) {
  const [lon, lat] = feature.geometry.coordinates || []
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return false

  const tolerance = parseFloat(rule.tolerance)
  const { dx, dy } = localMeters(lon, lat, parseFloat(rule.x), parseFloat(rule.y))
  const distance = Math.sqrt((dx * dx) + (dy * dy))

  return distance < tolerance
}

// Determines whether there are any Point features falling within tolerance for
// a rule, and appends all successful features if so.
function geoRadialReducer (rule, value) {
  const result = getPointFeatures(value)
    .filter(feature => isFeatureWithinTolerance(rule, feature))
    .map(feature => ({
      coordinates: [...feature.geometry.coordinates],
      type: feature.geometry.type
    }))

  return Object.assign(rule, {
    success: (result.length > 0),
    successfulClassifications: result
  })
}

export default geoRadialReducer
