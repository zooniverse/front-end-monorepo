const process = require('process')

const setCacheHeaders = require('./set-cache-headers')

// `process.env` casts all its properties to strings
const enableCacheHeaders = process.env.ENABLE_CACHE_HEADERS === 'true'
const assetPrefix = process.env.ASSET_PREFIX || ''

function configureNextServer (app, req, res) {
  const handleNextRequests = app.getRequestHandler()

  app.setAssetPrefix(assetPrefix)

  if (enableCacheHeaders) {
    setCacheHeaders(req, res)
  }

  handleNextRequests(req, res)
}

module.exports = configureNextServer
