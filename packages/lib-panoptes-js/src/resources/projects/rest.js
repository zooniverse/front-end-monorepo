const panoptes = require('../../panoptes')
const { endpoint } = require('./helpers')
const { raiseError } = require('../../utilityFunctions')

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
  if (projectId && typeof projectId !== 'string') return raiseError('Projects: Get request id must be a string.', 'typeError')

  return panoptes.get(`${endpoint}/${projectId}`, queryParams)
}

function update (params) {
  const { id, data } = params
  if (id && typeof id !== 'string') return raiseError('Projects: Update request id must be a string.', 'typeError')
  if (id && data) return panoptes.put(`${endpoint}/${id}`, data)
  if (!id) return raiseError('Projects: Update request missing project id.', 'error')
  if (!data) return raiseError('Projects: Update request missing data to post.', 'error')

  return raiseError('Projects: Update request missing required parameters: id and data.', 'error')
}

function del (params) {
  const id = (params) ? params.id : ''
  if (id && typeof id !== 'string') return raiseError('Projects: Delete request id must be a string.', 'typeError')
  if (id) return panoptes.del(`${endpoint}/${id}`)
  return raiseError('Projects: Delete request missing project id.', 'error')
}

module.exports = { create, get, update, del }
