import { checkRetiredStatus } from './'

export default async function fetchRows(subjects, workflow, page_size = 10, callback) {
  const { columns, rows } = subjects
  const pages = Math.ceil(rows.length / page_size)
  const data = rows.map(row => {
    const subject = {}
    columns.forEach((column, index) => {
      subject[column] = row[index]
    })
    subject.status = 'loading'
    return subject
  })
  callback(data)

  for (let page = 0; page < pages; page++) {
    const start = page * page_size
    const end = (page + 1) * page_size
    const subject_ids = data.slice(start, end).map(row => row.subject_id).join(',')
    const statuses = await checkRetiredStatus(subject_ids, workflow)
    function updateSeenStatus(rows) {
      const newRows = rows.slice()
      Object.entries(statuses).forEach(([ subjectID, subjectStatus ]) => {
        const subject = newRows.find(subject => subject.subject_id === parseInt(subjectID))
        if (subject) {
          subject.status = subjectStatus
        }
      })
      return newRows
    }
    callback(updateSeenStatus)
  }
}
