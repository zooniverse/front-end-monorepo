const panoptes = require('../../panoptes')
const { getProjectSlug, getProjectSlugFromURL, handleError } = require('./helpers')

const projectsEndpoint = '/projects'

// TODO: Could add helper functions to request project with expected included resources
// like project avatar and background
const projects = {
  create: (params) => {
    const newProjectData = (params && params.data) ? params.data : {}

    const allProjectData = Object.assign({
      private: true
    }, newProjectData)

    return panoptes.post(projectsEndpoint, allProjectData)
  },

  get: (params) => {
    const queryParams = (params && params.query) ? params.query : {}
    const projectId = (params && params.id) ? params.id : ''

    if (!projectId) return panoptes.get(projectsEndpoint, queryParams)
    if (projectId && typeof projectId !== 'string') return handleError('Projects: Get request id must be a string.')

    return panoptes.get(`${projectsEndpoint}/${projectId}`, queryParams)
  },

  getBySlug: (params) => {
    const queryParams = params || {}

    if (queryParams.slug && typeof queryParams.slug !== 'string') return handleError('Projects: Get request slug must be a string.')
    queryParams.slug = getProjectSlug(queryParams.slug)

    if (queryParams && queryParams.slug) {
      return panoptes.get(projectsEndpoint, queryParams)
    }

    return handleError('Projects: Get by slug request missing required parameter: slug string.')
  },

  getWithLinkedResources: (params) => {
    const include = { include: 'avatar,background,owners,pages' }

    if (params && typeof params !== 'object') return handleError('Projects: Get request params must be an object.')

    const queryParams = params ? Object.assign({}, params, include) : include
    if (queryParams.slug && typeof queryParams.slug !== 'string') return handleError('Projects: Get request slug must be a string.')
    if (queryParams.id && typeof queryParams.id !== 'string') return handleError('Projects: Get request id must be a string.')
    if (!queryParams.slug && !queryParams.id && !(isBrowser() || process.env.NODE_ENV === 'test' && global.window)) {
      return handleError('Projects: Get request must have either project id or slug.')
    }

    if (queryParams.id) {
      const projectID = queryParams.id
      delete queryParams.id
      return panoptes.get(`${projectsEndpoint}/${projectID}`, queryParams)
    }
    
    queryParams.slug = getProjectSlug(queryParams.slug)
    return panoptes.get(projectsEndpoint, queryParams)
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
