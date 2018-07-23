const { create, get, update, del } = require('./rest')
const { getSubjectsQueue } = require('./commonRequests')
const { endpoint } = require('./helpers')
const mocks = require('./mocks')

module.exports = {
  create,
  get,
  update,
  delete: del,
  endpoint,
  getSubjectsQueue,
  mocks
}