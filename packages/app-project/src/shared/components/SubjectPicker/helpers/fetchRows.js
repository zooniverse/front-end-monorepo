import { checkRetiredStatus } from './'

export default async function fetchRows(subjects, workflow, page_size = 10) {
  const { columns, rows } = subjects
  const IDColumn = columns.indexOf('subject_id')
  const pages = Math.ceil(rows.length / page_size)
  const retirementStatuses = {}
  for (let page = 0; page < pages; page++) {
    const start = page * page_size
    const end = (page + 1) * page_size
    const subject_ids = rows.slice(start, end).map(row => row[IDColumn]).join(',')
    const statuses = await checkRetiredStatus(subject_ids, workflow)
    Object.assign(retirementStatuses, statuses)
  }

  const data = rows.map(row => {
    const subject = {}
    columns.forEach((column, index) => {
      subject[column] = row[index]
    })
    subject.status = retirementStatuses[subject.subject_id]
    return subject
  })
  return data
}
