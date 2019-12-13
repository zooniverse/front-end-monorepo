const yup = require('yup')

const clientAppID = yup.string()
  .matches(/^[a-z0-9]+$/i)
  .required()

const cookieName = yup.string()
  .default('_Panoptes_session')

const hostUrl = yup.string()
  .url()
  .required()

const configSchema = yup.object().shape({
  clientAppID,
  cookieName,
  hostUrl,
})

/**
 * Validates the config object for a new client.
 *
 * @param {Object} config - the config object to validate.
 * @param {string} config.clientAppID - the client app ID of the API.
 * @param {string} [config.cookieName] - the name of the session cookie to use. Defaults to `_Panoptes_session`.
 * @param {string} config.hostUrl - the URL of the API.
 * @returns {Object} - the validated config object.
 * @throws Will throw an error if the config object doesn't match the schema.
 */
function validate (config) {
  return configSchema.validateSync(config)
}

module.exports = validate
