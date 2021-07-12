const API_HOST = 'https://subject-set-search-api.zooniverse.org/subjects'

export default async function fetchSubjects(
  subjectSetID,
  query='',
  sortField='priority'
) {
  const url = `${API_HOST}/${subjectSetID}.json?${query}&_sort=${sortField}`
  const mode = 'cors'
  const response = await fetch(url, { mode })
  const data = await response.json()
  return data
}
