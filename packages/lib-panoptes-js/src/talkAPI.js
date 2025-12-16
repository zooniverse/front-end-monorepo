import panoptes from './panoptes.js'
import { baseConfig, config } from './config.js'

function determineHost(query, host) {
  if (host) return host
  if (query?.env) {
    return baseConfig[query.env].talkHost
  }

  return config.talkHost
}

export function get(endpoint, query = {}, headers = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.get(endpoint, query, headers, talkHost)
}

export function post(endpoint, data, headers = {}, query = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.post(endpoint, data, headers, query, talkHost)
}

export function put(endpoint, data, headers = {}, query = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.put(endpoint, data, headers, query, talkHost)
}

export function del(endpoint, query = {}, headers = {}, host) {
  const talkHost = determineHost(query, host)
  return panoptes.del(endpoint, query, headers, talkHost)
}

const requests = {
  get,
  put,
  post,
  del
}

export default requests
