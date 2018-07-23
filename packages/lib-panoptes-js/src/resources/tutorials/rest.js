const panoptes = require('../../panoptes')
const { endpoint } = require('./helpers')
const { isParamTypeInvalid, raiseError } = require('../../utilityFunctions')

function create (params) {
  console.log('todo')
}

function get (params) {
  const queryParams = (params && params.query) ? params.query : {}
  const tutorialId = (params && params.id) ? params.id : ''
  const workflowId = (params && params.workflowId) ? params.workflowId : ''

  if (isParamTypeInvalid(tutorialId, 'string')) return raiseError('Tutorials: Get request id must be a string.', 'typeError')
  if (isParamTypeInvalid(workflowId, 'string')) return raiseError('Tutorials: Get request workflow id must be a string.', 'typeError')

  if (tutorialId) {
    delete queryParams.id
    return panoptes.get(`${endpoint}/${tutorialId}`, queryParams)
  }
  
  if (workflowId) {
    queryParams.workflow_id = workflowId
    delete queryParams.workflowId
    return panoptes.get(endpoint, queryParams)
  }
  
  return raiseError('Tutorials: Get request must include a workflow id or a tutorial id.', 'error')
}

function update () {
  console.log('todo')
}

function del () {
  console.log('todo')
}

module.exports = { create, get, update, del }