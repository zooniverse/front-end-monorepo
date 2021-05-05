export default async function getIndexedSubjects(workflow, priority = -1) {
  const { subjectSetId } = workflow
  const subjectSetURL = `https://subject-set-search-api.zooniverse.org/subjects/${subjectSetId}.json`
  const query = `priority__gt=${priority}&_sort=priority`
  const mode = 'cors'
  const response = await fetch(`${subjectSetURL}?${query}`, { mode })
  const { columns, rows } = await response.json()
  const subjectIDColumn = columns.indexOf('subject_id')
  const subjectIds = rows.map(row => row[subjectIDColumn]).slice(0,10)
  return subjectIds.join(',')
}
