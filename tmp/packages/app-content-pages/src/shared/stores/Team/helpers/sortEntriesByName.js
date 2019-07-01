import get from 'lodash/get'

// Sort into alphabetical order by name
function sortEntriesByName (a, b) {
  const aName = get(a, 'fields.name').toLowerCase()
  const bName = get(b, 'fields.name').toLowerCase()
  return aName.localeCompare(bName)
}

export default sortEntriesByName
