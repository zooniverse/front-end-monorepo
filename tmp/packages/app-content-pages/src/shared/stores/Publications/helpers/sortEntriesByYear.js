import get from 'lodash/get'

// Sort by descending year (high to low)
export function sortEntriesByYear (a, b) {
  const aYear = get(a, 'fields.year', '0')
  const bYear = get(b, 'fields.year', '0')
  return bYear - aYear
}
export default sortEntriesByYear
