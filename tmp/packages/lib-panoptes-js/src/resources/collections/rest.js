const panoptes = require('../../panoptes')
const { endpoint } = require('./helpers')
const { raiseError } = require('../../utilityFunctions')

function create (params) {
  const newCollectionData = (params && params.data) || {}
  const authorization = (params && params.authorization) ? params.authorization : ''
  const subjects = (params && params.subjects) || []
  const links = {
    subjects
  }
  if (params && params.project) {
    links.project = params.project
  }
  const collections = Object.assign({}, newCollectionData, { links })

  return panoptes.post(endpoint, { collections }, { authorization })
}

function get (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const collectionId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (!collectionId) return panoptes.get(endpoint, queryParams, { authorization })
  if (collectionId && typeof collectionId !== 'string') return raiseError('Collections: Get request id must be a string.', 'typeError')

  return panoptes.get(`${endpoint}/${collectionId}`, {}, { authorization })
}

function update (params) {
  const changes = (params && params.data) ? params.data : null
  const collectionId = params && params.id
  const authorization = (params && params.authorization) ? params.authorization : ''
  if (!collectionId) return raiseError('Collections: Update request id must be present.', 'typeError')
  if (!changes) return raiseError('Collection update: payload not supplied.', 'error')

  return panoptes.put(`${endpoint}/${collectionId}`, { collections: changes }, { authorization })
}

function del (params) {
  const collectionId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (!collectionId) return raiseError('Collections: Delete request id must be present.', 'typeError')
  if (collectionId && typeof collectionId !== 'string') return raiseError('Collections: Delete request id must be a string.', 'typeError')

  return panoptes.del(`${endpoint}/${collectionId}`, { authorization })
}

module.exports = { create, get, update, del }
