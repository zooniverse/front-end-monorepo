const panoptes = require('../../panoptes')
const { endpoint, handleError, isParamTypeInvalid } = require('./helpers')

function create (params) {
  console.log('todo')
}

function get (params) {
  // We probably always want the attached_images
  // There is a known Panoptes bug with the include param returning unrelated attached_images
  // https://github.com/zooniverse/Panoptes/issues/2279
  // include request doesn't go past page one
  // tutorials shoudn't have more than 20 steps, so, this is a way to enforce that.
  // const defaultQuery = { include: 'attached_images' }
  const queryParams = (params && params.query) ? params.query : {}
  const tutorialId = (params && params.id) ? params.id : ''
  const workflowId = (params && params.workflowId) ? params.workflowId : ''


  if (isParamTypeInvalid(tutorialId, 'string')) return handleError('Tutorials: Get request id must be a string.')
  if (isParamTypeInvalid(workflowId, 'string')) return handleError('Tutorials: Get request workflow id must be a string.')

  if (tutorialId) {
    delete queryParams.id
    return panoptes.get(`${endpoint}/${tutorialId}`, queryParams)
  }
  
  if (workflowId) return panoptes.get(endpoint, queryParams)
  
  return handleError('Tutorials: Get request must include a workflow id or a tutorial id.')
}

function update () {
  console.log('todo')
}

function del () {
  console.log('todo')
}

module.exports = { create, get, update, del }