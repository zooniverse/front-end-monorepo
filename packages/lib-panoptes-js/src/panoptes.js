/* global localStorage */

const superagent = require('superagent')
const { config } = require('./config')

function handleMissingParameter (message) {
  return Promise.reject(new Error(message))
}

function checkForAdminFlag () {
  if (typeof localStorage !== 'undefined' && localStorage !== null) {
    return !!localStorage.getItem('adminFlag') || undefined
  }

  return undefined
}

// TODO: Consider how to integrate a GraphQL option
function get (endpoint, query, authorization = null, host) {
  const defaultParams = { admin: checkForAdminFlag(), http_cache: true }

  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  const apiHost = host || config.host
  const request = superagent.get(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (authorization) request.set('Authorization', authorization)

  if (query && Object.keys(query).length > 0) {
    if (typeof query !== 'object') return Promise.reject(new TypeError('Query must be an object'))
    const fullQuery = Object.assign({}, query, defaultParams)
    request.query(fullQuery)
  } else {
    request.query(defaultParams)
  }

  return request.then(response => response)
}

function post (endpoint, data, authorization = null, host) {
  const defaultParams = { admin: checkForAdminFlag(), http_cache: true }

  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  const apiHost = host || config.host

  const request = superagent.post(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (authorization) request.set('Authorization', authorization)

  return request.query(defaultParams)
    .send(data)
    .then(response => response)
}

function put (endpoint, data, authorization = null, host) {
  const defaultParams = { admin: checkForAdminFlag(), http_cache: true }

  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  if (!data) return handleMissingParameter('Request needs a defined data for update')
  const apiHost = host || config.host

  const request = superagent.put(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (authorization) request.set('Authorization', authorization)

  return request.query(defaultParams)
    .send(data)
    .then(response => response)
}

function del (endpoint, authorization = null, host) {
  const defaultParams = { admin: checkForAdminFlag(), http_cache: true }

  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  const apiHost = host || config.host

  const request = superagent.delete(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (authorization) request.set('Authorization', authorization)

  return request.query(defaultParams)
    .then(response => response)
}

const requests = {
  get,
  put,
  post,
  del
}

module.exports = requests
