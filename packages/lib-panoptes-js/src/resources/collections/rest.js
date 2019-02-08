const panoptes = require('../../panoptes')
const { endpoint } = require('./helpers')
const { raiseError } = require('../../utilityFunctions')

function create (params) {
  const newCollectionData = (params && params.data) ? params.data : {}
  const authorization = (params && params.authorization) ? params.authorization : ''
  const projects = params && params.projects
  const subjects = (params && params.subjects) ? params.subjects : []
  if (!projects || !Array.isArray(projects)) return raiseError('Collection create: projects array is required.', 'error')
  // TODO: project and subject links
  const links = {
    projects,
    subjects
  }
  const collectionData = Object.assign({}, newCollectionData, { links })

  return panoptes.post(endpoint, collectionData, authorization)
}

function get (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const collectionId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (!collectionId) return panoptes.get(endpoint, queryParams, authorization)
  if (collectionId && typeof collectionId !== 'string') return raiseError('Collections: Get request id must be a string.', 'typeError')

  return panoptes.get(`${endpoint}/${collectionId}`, {}, authorization)
}

function update (params) {
  const changes = (params && params.data) ? params.data : null
  const collectionId = params && params.id
  const authorization = (params && params.authorization) ? params.authorization : ''
  if (!collectionId) return raiseError('Collections: Update request id must be present.', 'typeError')
  if (!changes) return raiseError('Collection update: payload not supplied.', 'error')

  return panoptes.put(`${endpoint}/${collectionId}`, { collections: changes }, authorization)
}

function del (params) {
  const collectionId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (!collectionId) return raiseError('Collections: Delete request id must be present.', 'typeError')
  if (collectionId && typeof collectionId !== 'string') return raiseError('Collections: Delete request id must be a string.', 'typeError')

  return panoptes.del(`${endpoint}/${collectionId}`, authorization)
}

module.exports = { create, get, update, del }
