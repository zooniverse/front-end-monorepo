import panoptes from '../../panoptes.js'
import { queuedEndpoint } from './helpers.js'
import { isParamTypeInvalid, raiseError } from '../../utilityFunctions/utilityFunctions.js'

export function getSubjectQueue (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const workflowId = (params && params.workflowId) ? params.workflowId : ''
  const subjectSetId = (params && params.subjectSetId) ? params.subjectSetId : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (isParamTypeInvalid(workflowId, 'string')) return raiseError('Subjects: Get request workflow id must be a string.', 'typeError')
  if (isParamTypeInvalid(subjectSetId, 'string')) return raiseError('Subjects: Get request subject set id must be a string.', 'typeError')

  if (workflowId) {
    queryParams.workflow_id = workflowId
    if (subjectSetId) queryParams.subject_set_id = subjectSetId

    return panoptes.get(queuedEndpoint, queryParams, { authorization })
  }

  return raiseError('Subjects: Get request must include a workflow id.', 'error')
}
