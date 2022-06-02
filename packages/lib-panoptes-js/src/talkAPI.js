const panoptes = require('./panoptes')
const { baseConfig, config } = require('./config')

function determineHost(query, host) {
  if (host) return host
  if (query?.env) {
    return baseConfig[query.env].talkHost
  }

  return config.talkHost
}

// TODO: Consider how to integrate a GraphQL option
function get(endpoint, query = {}, headers = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.get(endpoint, query, headers, talkHost)
}

function post(endpoint, data, headers = {}, query = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.post(endpoint, data, headers, query, talkHost)
}

function put(endpoint, data, headers = {}, query = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.put(endpoint, data, headers, query, talkHost)
}

function del(endpoint, query = {}, headers = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.del(endpoint, query, headers, talkHost)
}

const requests = {
  get,
  put,
  post,
  del
}

module.exports = requests
