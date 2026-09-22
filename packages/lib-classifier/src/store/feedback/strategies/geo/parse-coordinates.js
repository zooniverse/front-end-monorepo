function isLonLat (position) {
  return Array.isArray(position) && position.length === 2 && position.every(Number.isFinite)
}

// A `#feedback_N_coordinates` value is a JSON string of [lon, lat] pairs;
// anything else is undefined so ruleChecker drops the rule.
function parseCoordinates (value, minLength) {
  let coordinates = value
  if (typeof value === 'string') {
    try {
      coordinates = JSON.parse(value)
    } catch (error) {
      return undefined
    }
  }
  const valid = Array.isArray(coordinates) && coordinates.length >= minLength && coordinates.every(isLonLat)
  return valid ? coordinates : undefined
}

export default parseCoordinates
