// require('axios-debug-log')({
//   request: function (debug, config) {
//     debug('Request with ' + JSON.stringify(config))
//   }
//   response: function (debug, response) {
//     debug(
//       'Response with ' + response.headers['content-type'],
//       'from ' + response.config.url
//     )
//   },
//   error: function (debug, error) {
//     // Read https://www.npmjs.com/package/axios#handling-errors for more info
//     debug('Boom', error)
//   }
// })

const validateConfig = require('./helpers/validate-config')
const createHttpClient = require('./create-http-client')
const Client = require('./client')

/**
 * Creates a new Panoptes client
 *
 * @param {Object} config - the config object to validate.
 * @param {string} config.clientAppID - the client app ID of the API.
 * @param {string} [config.cookieName] - the name of the session cookie to use. Defaults to `_Panoptes_session`.
 * @param {string} config.hostUrl - the URL of the API.
 * @returns {Object} Client instance.
 */
function createClient (config = {}) {
  const validatedConfig = validateConfig(config)
  const httpClient = createHttpClient(config.hostUrl)
  return new Client(validatedConfig, httpClient)
}

module.exports = createClient
