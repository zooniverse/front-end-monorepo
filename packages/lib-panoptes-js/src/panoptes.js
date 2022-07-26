/* global localStorage */

const superagent = require('superagent')
const { baseConfig, config } = require('./config')

function handleMissingParameter (message) {
  return Promise.reject(new Error(message))
}

function checkForAdminFlag () {
  if (typeof localStorage !== 'undefined' && localStorage !== null) {
    return !!localStorage.getItem('adminFlag') || undefined
  }

  return undefined
}

function determineHost (query, host) {
  if (host) return host
  if (query && query.env) {
    return baseConfig[query.env].host
  }

  return config.host
}

function parseHeaders(headers = {}) {
  let httpHeaders = {}

  Object.entries(headers).forEach(([key, value]) => {
    let header = key
    if (key === 'authorization') {
      header = 'Authorization'
    }
    if (key === 'etag') {
      header = 'If-Match'
    }
    httpHeaders[header] = value
  })
  return httpHeaders
}

function getQueryParams (query) {
  const defaultParams = { admin: checkForAdminFlag(), http_cache: true }

  if (query && Object.keys(query).length > 0) {
    if (query && query.env) delete query.env
    const fullQuery = Object.assign({}, query, defaultParams)
    return fullQuery
  } else {
    return defaultParams
  }
}

// TODO: Consider how to integrate a GraphQL option
function get (endpoint, query = {}, headers = {}, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  if (typeof query !== 'object') return Promise.reject(new TypeError('Query must be an object'))

  const apiHost = determineHost(query, host)
  const request = superagent.get(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (headers){
    request.set(parseHeaders(headers))
  }
  const queryParams = getQueryParams(query)

  return request.query(queryParams).then(response => response)
}

function post (endpoint, data, headers = {}, query = {}, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  if (typeof query !== 'object') return Promise.reject(new TypeError('Query must be an object'))

  const apiHost = determineHost(query, host)
  const request = superagent.post(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (headers){
    request.set(parseHeaders(headers))
  }
  const queryParams = getQueryParams(query)

  return request.query(queryParams)
    .send(data)
    .then(response => response)
}

function put (endpoint, data, headers = {}, query = {}, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  if (!data) return handleMissingParameter('Request needs a defined data for update')
  if (typeof query !== 'object') return Promise.reject(new TypeError('Query must be an object'))

  const apiHost = determineHost(query, host)
  const request = superagent.put(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (headers){
    request.set(parseHeaders(headers))
  }
  const queryParams = getQueryParams(query)

  return request.query(queryParams)
    .send(data)
    .then(response => response)
}

function del (endpoint, query = {}, headers = {}, host) {
  if (!endpoint) return handleMissingParameter('Request needs a defined resource endpoint')
  if (typeof query !== 'object') return Promise.reject(new TypeError('Query must be an object'))

  const apiHost = determineHost(query, host)
  const request = superagent.delete(`${apiHost}${endpoint}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/vnd.api+json; version=1')

  if (headers){
    request.set(parseHeaders(headers))
  }
  const queryParams = getQueryParams(query)

  return request.query(queryParams)
    .then(response => response)
}

const requests = {
  get,
  put,
  post,
  del
}

module.exports = requests
