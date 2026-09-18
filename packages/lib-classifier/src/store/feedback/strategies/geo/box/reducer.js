import getPointFeatures from '../get-point-features'
import localMeters from '../local-meters'

function isFeatureWithinBox (rule, feature) {
  const [lon, lat] = feature.geometry.coordinates || []
  if (!Number.isFinite(lon) || !Number.isFinite(lat)) return false

  const width = parseFloat(rule.width)
  const height = parseFloat(rule.height)
  const tolerance = parseFloat(rule.tolerance)
  const { dx, dy } = localMeters(lon, lat, parseFloat(rule.x), parseFloat(rule.y))

  // Rotate into the box's frame; theta is clockwise degrees, as in pointInEllipse.
  const thetaRad = Math.PI * (-parseFloat(rule.theta) / 180)
  const projectedX = (dx * Math.cos(thetaRad)) + (dy * Math.sin(thetaRad))
  const projectedY = (dy * Math.cos(thetaRad)) - (dx * Math.sin(thetaRad))

  return (
    Math.abs(projectedX) < ((width / 2) + tolerance) &&
    Math.abs(projectedY) < ((height / 2) + tolerance)
  )
}

// Determines whether there are any Point features falling within the box for a
// rule, and appends all successful features if so.
function geoBoxReducer (rule, value) {
  const result = getPointFeatures(value)
    .filter(feature => isFeatureWithinBox(rule, feature))
    .map(feature => ({
      coordinates: [...feature.geometry.coordinates],
      type: feature.geometry.type
    }))

  return Object.assign(rule, {
    success: (result.length > 0),
    successfulClassifications: result
  })
}

export default geoBoxReducer
