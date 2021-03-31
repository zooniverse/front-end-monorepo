import { panoptes } from '@zooniverse/panoptes-js'
const env = 'production'

export default async function checkRetiredStatus(subject_ids, workflow, page_size=20) {
  const workflow_id = workflow.id
  const retirementStatuses = {}
  const response = await panoptes
    .get('/subject_workflow_statuses', {
      env,
      page_size,
      subject_ids,
      workflow_id
    })
  const { subject_workflow_statuses } = response.body
  subject_workflow_statuses.forEach(status => {
    const inProgress = status.classifications_count > 0 ? 'In progress' : 'Unclassified'
    retirementStatuses[status.links.subject] = status.retired_at ? 'Retired' : inProgress
  })
  return retirementStatuses
}
