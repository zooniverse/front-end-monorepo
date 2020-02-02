const axios = require('axios')

/**
 * Creates an HTTP client for use by the Client instance.
 *
 * @private
 * @param {string} hostUrl - The base host URL to make auth requests against
 * @returns {Object} - A configured HTTP client (based on Axios)
 */
function createHttpClient (hostUrl) {
  return axios.create({
    baseURL: hostUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

module.exports = createHttpClient
