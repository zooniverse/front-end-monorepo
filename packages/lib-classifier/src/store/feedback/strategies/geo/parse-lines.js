function isPositions (value) {
  return Array.isArray(value) &&
    value.length >= 2 &&
    value.every(position => Array.isArray(position) && position.length === 2 && position.every(Number.isFinite))
}

// A line target is one line or several: [[lon,lat],...] or [[[lon,lat],...],...].
// Anything else is undefined, so ruleChecker drops the rule.
function parseLines (value) {
  let coordinates = value
  if (typeof value === 'string') {
    try {
      coordinates = JSON.parse(value)
    } catch (error) {
      return undefined
    }
  }
  if (!Array.isArray(coordinates) || coordinates.length === 0) return undefined
  if (isPositions(coordinates)) return coordinates
  return coordinates.every(isPositions) ? coordinates : undefined
}

export default parseLines
