// Sets cache headers dependent on asset type. Caching headers are set here so
// that they are respected downstream by CloudFront.
//
// Javascript files can have a massive `max-age` as they are cache-busted
// by filename. Everything else is set to a minute.

const process = require('process')

const enableCacheHeaders = process.env.ENABLE_CACHE_HEADERS === 'true'
const DEFAULT_MAX_AGE = process.env.DEFAULT_MAX_AGE || 60 // 1 minute
const JS_MAX_AGE = process.env.JS_MAX_AGE || 31536000 // 1 year

function setCacheHeaders (req, res) {
  if (enableCacheHeaders) {
    let maxAge = isJsRequest(req) ? JS_MAX_AGE : DEFAULT_MAX_AGE
    res.setHeader('Cache-Control', `max-age=${maxAge}`)
  }
}

function isJsRequest (req) {
  const regex = /\.js$/i
  return regex.test(req.path)
}

module.exports = setCacheHeaders
