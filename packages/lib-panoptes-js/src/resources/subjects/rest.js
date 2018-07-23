const panoptes = require('../../panoptes')
const { endpoint } = require('./helpers')
const { isParamTypeInvalid, raiseError } = require('../../utilityFunctions')

function create(params) {
  console.log('todo')
}

function get(params) {
  const queryParams = (params && params.query) ? params.query : {}
  const subjectId = (params && params.id) ? params.id : ''

  if (isParamTypeInvalid(subjectId, 'string')) return raiseError('Subjects: Get request id must be a string.', 'typeError')

  if (subjectId) {
    delete queryParams.id
    return panoptes.get(`${endpoint}/${subjectId}`, queryParams)
  }

  if (console) console.warn('Subjects: Are you trying to request subjects for classification? If so, use the helper `getSubjectsQueue` instead.')
  return panoptes.get(endpoint, queryParams)
}

function update() {
  console.log('todo')
}

function del() {
  console.log('todo')
}

module.exports = { create, get, update, del }