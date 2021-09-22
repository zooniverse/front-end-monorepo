export default async function getIndexedSubjects(
  subjectSetId,
  priority = -1,
  operator = 'gt',
  sort = 'asc'
) {
  const subjectSetURL = `https://subject-set-search-api.zooniverse.org/subjects/${subjectSetId}.json`
  const _sort = sort === 'asc' ? '_sort' : '_sort_desc'
  const query = `priority__${operator}=${priority}&${_sort}=priority`
  const mode = 'cors'
  const response = await fetch(`${subjectSetURL}?${query}`, { mode })
  const { columns, rows } = await response.json()
  const subjectIDColumn = columns.indexOf('subject_id')
  const subjectIds = rows.map(row => row[subjectIDColumn]).slice(0,10)
  return subjectIds
}
