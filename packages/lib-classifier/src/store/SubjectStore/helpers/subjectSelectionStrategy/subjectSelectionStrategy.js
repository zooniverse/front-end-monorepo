import { getIndexedSubjects } from '../'

export default async function subjectSelectionStrategy(workflow, subjectIDs, priority = -1) {
  const workflow_id = workflow.id

  /** Fetch specific subjects for any workflow */
  if (subjectIDs) {
    const apiUrl = '/subjects/selection'
    const ids = subjectIDs.join(',')
    const params = {
      ids,
      workflow_id
    }
    return {
      apiUrl,
      params
    }
  }

  /** Fetch subject groups for workflows that use the subject group viewer */
  if (workflow.configuration.subject_viewer === 'subjectGroup') {
    const apiUrl = '/subjects/grouped'
    const num_rows = workflow.configuration.subject_viewer_config?.grid_rows || 1
    const num_columns = workflow.configuration.subject_viewer_config?.grid_columns || 1
    const params = {
      num_columns,
      num_rows,
      workflow_id
    }
    return {
      apiUrl,
      params
    }
  }

  /** fetch ordered subjects for indexed subject sets */
  if (workflow.hasIndexedSubjects) {
    const apiUrl = '/subjects/selection'
    let ids = await getIndexedSubjects(workflow.subjectSetId, priority)
    if (ids === '') {
      ids = await getIndexedSubjects(workflow.subjectSetId)
    }
    const params = {
      ids,
      workflow_id
    }
    return {
      apiUrl,
      params
    }
  }

  /** Random grouped selection for grouped workflows */
  if (workflow.grouped) {
    const apiUrl = '/subjects/queued'
    const subject_set_id = workflow.subjectSetId
    const params = {
      subject_set_id,
      workflow_id
    }
    return {
      apiUrl,
      params
    }
  }

  /** default random queued selection */
  const apiUrl = '/subjects/queued'
  const params = {
    workflow_id
  }
  return {
    apiUrl,
    params
  }
}