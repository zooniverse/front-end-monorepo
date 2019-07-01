const { create, get, update, del } = require('./rest')
const { addSubjects, removeSubjects } = require('./commonRequests')
const { endpoint } = require('./helpers')
const mocks = require('./mocks')

module.exports = {
  create,
  get,
  delete: del,
  update,
  endpoint,
  addSubjects,
  removeSubjects,
  mocks
}
