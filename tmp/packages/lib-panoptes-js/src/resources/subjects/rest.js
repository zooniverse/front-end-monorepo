const panoptes = require('../../panoptes')
const { endpoint } = require('./helpers')
const { isParamTypeInvalid, raiseError } = require('../../utilityFunctions')

function create (params) {
  console.log('todo')
}

function get (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const subjectId = (params && params.id) ? params.id : ''
  const authorization = (params && params.authorization) ? params.authorization : ''

  if (isParamTypeInvalid(subjectId, 'string')) return raiseError('Subjects: Get request id must be a string.', 'typeError')

  if (subjectId) {
    return panoptes.get(`${endpoint}/${subjectId}`, queryParams, { authorization })
  }

  if (console && !subjectId && process.env.NODE_ENV !== 'test') {
    console.warn('Subjects: Are you trying to request subjects for classification? If so, use the helper `getSubjectsQueue` instead.')
    console.warn('Subjects: To request a page of subjects linked to a subject set, use the SetMemberSubjects Panoptes resource instead.')
  }
  return raiseError('Subjects: Get request must include a subject id.', 'error')
}

function update () {
  console.log('todo')
}

function del () {
  console.log('todo')
}

module.exports = { create, get, update, del }
