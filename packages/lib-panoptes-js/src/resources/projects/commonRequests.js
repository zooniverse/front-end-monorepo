const { endpoint, getProjectSlugFromURL } = require('./helpers')
const { raiseError } = require('../../utilityFunctions')
const panoptes = require('../../panoptes')

function getBySlug (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (queryParams.slug && typeof queryParams.slug !== 'string') return raiseError('Projects: Get request slug must be a string.', 'typeError')
  if (queryParams.slug && queryParams.slug.includes('projects')) {
    queryParams.slug = getProjectSlugFromURL(queryParams.slug)
  }

  if (queryParams.slug) {
    return panoptes.get(endpoint, queryParams, { authorization }, params.host)
  }

  return raiseError('Projects: Get by slug request missing required parameter: slug string.', 'error')
}

function getWithLinkedResources (params) {
  const include = { include: 'avatar,background,owners,pages' }
  const projectId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (params && typeof params !== 'object') return raiseError('Projects: Get request params must be an object.', 'error')

  const queryParams = (params && params.query) ? Object.assign({}, params.query, include) : include
  if (queryParams.slug && typeof queryParams.slug !== 'string') return raiseError('Projects: Get request slug must be a string.', 'typeError')
  if (projectId && typeof projectId !== 'string') return raiseError('Projects: Get request id must be a string.', 'typeError')
  if (!queryParams.slug && !projectId) return raiseError('Projects: Get request must have either project id or slug.', 'typeError')
  if (projectId) return panoptes.get(`${endpoint}/${projectId}`, queryParams, { authorization })

  if (queryParams.slug && queryParams.slug.includes('projects')) {
    queryParams.slug = getProjectSlugFromURL(queryParams.slug)
  }

  return panoptes.get(endpoint, queryParams, { authorization }, params.host)
}

module.exports = { getBySlug, getWithLinkedResources }
