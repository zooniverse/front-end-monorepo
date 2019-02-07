const { create, get, update, del } = require('./rest')
const { addSubjects, removeSubjects } = require('./commonRequests')
const { endpoint } = require('./helpers')

module.exports = {
  create,
  get,
  delete: del,
  update,
  endpoint,
  addSubjects,
  removeSubjects
}
