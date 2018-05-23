const panoptes = require('../../panoptes')

const projectsEndpoint = '/projects'

function handleError (error) {
  if (console && process.env.NODE_ENV !== 'test') console.error(error)
  return Promise.reject(error)
}

// TODO: Could add helper functions to request project with expected included resources
// like project avatar and background
const projects = {
  create: (params) => {
    const newProjectData = (params && params.data) ? params.data : {}

    const allProjectData = Object.assign({
      private: true
    }, newProjectData)

    return panoptes.post(`${projectsEndpoint}/`, allProjectData)
  },

  get: (params) => {
    const queryParams = (params && params.query) ? params.query : {}
    const projectId = (params && params.id) ? params.id : ''

    if (!projectId) return panoptes.get(projectsEndpoint, queryParams)
    if (projectId && typeof projectId !== 'string') return handleError('Projects: Get request id must be a string.')

    return panoptes.get(`${projectsEndpoint}/${projectId}`, queryParams)
  },

  update: (params) => {
    const { id, data } = params
    if (id && typeof id !== 'string') return handleError('Projects: Update request id must be a string.')
    if (id && data) return panoptes.put(`${projectsEndpoint}/${id}`, data)
    if (!id) return handleError('Projects: Update request missing project id.')
    if (!data) return handleError('Projects: Update request missing data to post.')

    return handleError('Projects: Update request missing required parameters: id and data.')
  },

  delete: (params) => {
    const id = (params) ? params.id : ''
    if (id && typeof id !== 'string') return handleError('Projects: Delete request id must be a string.')
    if (id) return panoptes.del(`${projectsEndpoint}/${id}`)
    return handleError('Projects: Delete request missing project id.')
  }
}

module.exports = { projects, projectsEndpoint }
