import panoptes from '../../panoptes.js'
import { endpoint } from './helpers.js'
import { raiseError } from '../../utilityFunctions/utilityFunctions.js'

export function create (params) {
  const newProjectData = (params && params.data) ? params.data : {}
  const authorization = (params && params.authorization) ? params.authorization : ''

  const allProjectData = Object.assign({
    private: true
  }, newProjectData)

  return panoptes.post(endpoint, allProjectData, { authorization })
}

export function get (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const projectId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (!projectId) return panoptes.get(endpoint, queryParams, { authorization })
  if (projectId && typeof projectId !== 'string') return raiseError('Projects: Get request id must be a string.', 'typeError')

  return panoptes.get(`${endpoint}/${projectId}`, queryParams, { authorization })
}

export function update (params) {
  const { id, data } = params
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (id && typeof id !== 'string') return raiseError('Projects: Update request id must be a string.', 'typeError')
  if (id && data) return panoptes.put(`${endpoint}/${id}`, data, { authorization })
  if (!id) return raiseError('Projects: Update request missing project id.', 'error')
  if (!data) return raiseError('Projects: Update request missing data to post.', 'error')

  return raiseError('Projects: Update request missing required parameters: id and data.', 'error')
}

export function del (params) {
  const id = (params) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (id && typeof id !== 'string') return raiseError('Projects: Delete request id must be a string.', 'typeError')
  if (id) return panoptes.del(`${endpoint}/${id}`, null, { authorization })
  return raiseError('Projects: Delete request missing project id.', 'error')
}
