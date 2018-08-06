const { create, get, update, del } = require('./rest')
const { getSubjectQueue } = require('./commonRequests')
const { endpoint } = require('./helpers')
const mocks = require('./mocks')

module.exports = {
  create,
  get,
  update,
  delete: del,
  endpoint,
  getSubjectQueue,
  mocks
}