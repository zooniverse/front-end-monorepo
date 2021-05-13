import { checkRetiredStatus } from './'

export default async function fetchRows(subjects, workflow, page_size) {
  const { columns, rows } = subjects
  const IDColumn = columns.indexOf('subject_id')
  const subject_ids = rows.map(row => row[IDColumn]).join(',')
  const retirementStatuses = await checkRetiredStatus(subject_ids, workflow, page_size)
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
