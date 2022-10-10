import { checkRetiredStatus } from './'

export default async function fetchStatuses(
  subjects = [],
  workflow,
  page_size = 10,
) {
  const newRows = []
  const pages = Math.ceil(subjects.length / page_size)
  for (let page = 0; page < pages; page++) {
    const start = page * page_size
    const end = (page + 1) * page_size
    const subject_ids = subjects.slice(start, end).map(row => row.subject_id).join(',')
    const statuses = await checkRetiredStatus(subject_ids, workflow)
    Object.entries(statuses).forEach(([ subjectID, subjectStatus ]) => {
      const subject = subjects.find(subject => subject.subject_id === parseInt(subjectID))
      if (subject) {
        subject.status = subjectStatus
        newRows.push(subject)
      }
    })
  }
  return newRows
}
