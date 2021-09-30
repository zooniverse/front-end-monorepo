const API_HOST = 'https://subject-set-search-api.zooniverse.org/subjects'
const ASCENDING_SORT = '_sort'
const DESCENDING_SORT = '_sort_desc'

export default async function fetchSubjects(
  subjectSetID,
  query='',
  sortField='priority',
  sortOrder='asc'
) {
  const sortOrderParam = 'asc'.localeCompare(sortOrder) ? DESCENDING_SORT : ASCENDING_SORT
  const url = `${API_HOST}/${subjectSetID}.json?${query}&${sortOrderParam}=${sortField}`
  const mode = 'cors'
  const response = await fetch(url, { mode })
  const data = await response.json()
  return data
}
