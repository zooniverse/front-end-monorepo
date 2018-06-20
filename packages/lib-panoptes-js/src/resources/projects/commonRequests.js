const { endpoint, handleError, getProjectSlugFromURL } = require('./helpers')
const panoptes = require('../../panoptes')

function getBySlug (params) {
  const queryParams = params || {}

  if (queryParams.slug && typeof queryParams.slug !== 'string') return handleError('Projects: Get request slug must be a string.')
  if (queryParams.slug && queryParams.slug.includes('projects')) {
    queryParams.slug = getProjectSlugFromURL(queryParams.slug)
  }

  if (queryParams && queryParams.slug) {
    return panoptes.get(endpoint, queryParams)
  }

  return handleError('Projects: Get by slug request missing required parameter: slug string.')
}

function getWithLinkedResources (params) {
  const include = { include: 'avatar,background,owners,pages' }

  if (params && typeof params !== 'object') return handleError('Projects: Get request params must be an object.')

  const queryParams = params ? Object.assign({}, params, include) : include
  if (queryParams.slug && typeof queryParams.slug !== 'string') return handleError('Projects: Get request slug must be a string.')
  if (queryParams.id && typeof queryParams.id !== 'string') return handleError('Projects: Get request id must be a string.')
  if (!queryParams.slug && !queryParams.id) return handleError('Projects: Get request must have either project id or slug.')

  if (queryParams.id) {
    const projectID = queryParams.id
    delete queryParams.id
    return panoptes.get(`${endpoint}/${projectID}`, queryParams)
  }

  if (queryParams.slug && queryParams.slug.includes('projects')) {
    queryParams.slug = getProjectSlugFromURL(queryParams.slug)
  }

  return panoptes.get(endpoint, queryParams)
}

module.exports = { getBySlug, getWithLinkedResources }
