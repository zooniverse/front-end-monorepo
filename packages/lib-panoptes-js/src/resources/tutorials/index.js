const { create, get, update, del } = require('./rest')
const { endpoint } = require('./helpers')

const tutorials = {
  create,
  get,
  update,
  delete: del,
  endpoint,
  mocks
}

module.exports = { tutorials }