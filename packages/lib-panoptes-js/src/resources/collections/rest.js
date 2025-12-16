import panoptes from '../../panoptes.js'
import { endpoint } from './helpers.js'
import { raiseError } from '../../utilityFunctions/utilityFunctions.js'

export function create (params) {
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

export function get({
  authorization = '',
  id = '',
  query = {}
}) {
  if (!id) {
    return panoptes.get(endpoint, query, { authorization })
  }
  if (id && typeof id !== 'string') {
    return raiseError('Collections: Get request id must be a string.', 'typeError')
  }

  return panoptes.get(`${endpoint}/${id}`, {}, { authorization })
}

export function update (params) {
  const changes = (params && params.data) ? params.data : null
  const collectionId = params && params.id
  const authorization = (params && params.authorization) ? params.authorization : ''
  if (!collectionId) return raiseError('Collections: Update request id must be present.', 'typeError')
  if (!changes) return raiseError('Collection update: payload not supplied.', 'error')

  return panoptes.put(`${endpoint}/${collectionId}`, { collections: changes }, { authorization })
}

export function del (params) {
  const collectionId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (!collectionId) return raiseError('Collections: Delete request id must be present.', 'typeError')
  if (collectionId && typeof collectionId !== 'string') return raiseError('Collections: Delete request id must be a string.', 'typeError')

  return panoptes.del(`${endpoint}/${collectionId}`, { authorization })
}
