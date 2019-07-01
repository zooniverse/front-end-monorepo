import get from 'lodash/get'

// Sort into alphabetical order by title
function sortEntriesByTitle (a, b) {
  const aTitle = get(a, 'fields.title').toLowerCase()
  const bTitle = get(b, 'fields.title').toLowerCase()
  return aTitle.localeCompare(bTitle)
}

export default sortEntriesByTitle
