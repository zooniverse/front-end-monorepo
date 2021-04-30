import { checkRetiredStatus } from './'

export default async function fetchRows(subjects, workflow, page_size) {
  const subject_ids = subjects.map(subject => subject.subject_id).join(',')
  const retirementStatuses = await checkRetiredStatus(subject_ids, workflow, page_size)
  const rows = subjects.map(subject => {
    const { id, subject_id, ...fields } = subject
    return {
      subject_id,
      status: retirementStatuses[subject_id],
      ...fields
    }
  })
  return rows
}
