// Configures the Next.js asset prefix, which is used to determine the urls for
// assets in a zoned environment.
// More info: https://github.com/zeit/next.js/#multi-zones

const process = require('process')

// `process.env` casts all its properties to strings
const assetPrefix = process.env.ASSET_PREFIX || ''

function setAssetPrefix (app) {
  app.setAssetPrefix(assetPrefix)
}

module.exports = setAssetPrefix
