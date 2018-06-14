const panoptes = require('../../panoptes')
const { handleError, endpoint } = require('./helpers')

function create (params) {
  const newProjectData = (params && params.data) ? params.data : {}

  const allProjectData = Object.assign({
    private: true
  }, newProjectData)

  return panoptes.post(endpoint, allProjectData)
}

function get (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const projectId = (params && params.id) ? params.id : ''

  if (!projectId) return panoptes.get(endpoint, queryParams)
  if (projectId && typeof projectId !== 'string') return handleError('Projects: Get request id must be a string.')

  return panoptes.get(`${endpoint}/${projectId}`, queryParams)
}

function update (params) {
  const { id, data } = params
  if (id && typeof id !== 'string') return handleError('Projects: Update request id must be a string.')
  if (id && data) return panoptes.put(`${endpoint}/${id}`, data)
  if (!id) return handleError('Projects: Update request missing project id.')
  if (!data) return handleError('Projects: Update request missing data to post.')

  return handleError('Projects: Update request missing required parameters: id and data.')
}

function del (params) {
  const id = (params) ? params.id : ''
  if (id && typeof id !== 'string') return handleError('Projects: Delete request id must be a string.')
  if (id) return panoptes.del(`${endpoint}/${id}`)
  return handleError('Projects: Delete request missing project id.')
}

module.exports = { create, get, update, del }
