const panoptes = require('../../panoptes')
const { endpoint } = require('./helpers')
const { raiseError } = require('../../utilityFunctions')

function addSubjects (params) {
  const collectionId = params && params.id
  if (!collectionId) return raiseError('Collections add subject: collections ID is required.', 'error')
  const authorization = (params && params.authorization) ? params.authorization : ''
  const subjects = params && params.subjects
  if (!subjects || !Array.isArray(subjects)) return raiseError('Collections add subjects: subjects array is required.', 'error')

  if (typeof collectionId !== 'string') return raiseError('Collections add link: collections id must be a string.', 'typeError')

  return panoptes.post(`${endpoint}/${collectionId}/links/subjects`, { subjects }, { authorization })
}

function removeSubjects (params) {
  const collectionId = params && params.id
  if (!collectionId) return raiseError('Collections remove subject: collections ID is required.', 'error')
  const authorization = (params && params.authorization) ? params.authorization : ''
  const subjects = params && params.subjects
  if (!subjects || !Array.isArray(subjects)) return raiseError('Collections remove subjects: subjects array is required.', 'error')

  if (typeof collectionId !== 'string') return raiseError('Collections remove link: collections id must be a string.', 'typeError')

  return panoptes.del(`${endpoint}/${collectionId}/links/subjects/${subjects.join(',')}`, { authorization })
}

module.exports = { addSubjects, removeSubjects }
