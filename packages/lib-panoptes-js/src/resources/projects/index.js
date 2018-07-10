const { create, get, update, del } = require('./rest')
const { getBySlug, getWithLinkedResources } = require('./commonRequests')
const { endpoint } = require('./helpers')
const mocks = require('./mocks')

const projects = {
  create,
  get,
  update,
  delete: del,
  endpoint,
  getBySlug,
  getWithLinkedResources,
  mocks
}

module.exports = { projects }
