import get from 'lodash/get'

// Sort by ascending weight (low to high)
function sortEntriesByWeight (a, b) {
  const aWeight = get(a, 'fields.weight', 0)
  const bWeight = get(b, 'fields.weight', 0)
  return aWeight - bWeight
}
export default sortEntriesByWeight
