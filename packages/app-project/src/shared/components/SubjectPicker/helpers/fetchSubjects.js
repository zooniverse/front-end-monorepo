const API_HOST = 'https://redsea.zooniverse.org/search'

export default async function fetchSubjects(
  subjectSetID,
  query='',
  sortField='subject_id',
  sortOrder='asc',
  page_size=20
) {
  const url = `${API_HOST}/${subjectSetID}?${query}&limit=${page_size}&sort_field=${sortField}&sort_order=${sortOrder}`
  const mode = 'cors'
  const response = await fetch(url, { mode })
  const results = await response.json()
  return results
}
