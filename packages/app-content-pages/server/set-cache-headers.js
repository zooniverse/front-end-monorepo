const process = require('process')

const DEFAULT_MAX_AGE = process.env.DEFAULT_MAX_AGE || 60 // 1 minute
const JS_MAX_AGE = process.env.JS_MAX_AGE || 31536000 // 1 year

function setCacheHeaders (req, res) {
  let maxAge = DEFAULT_MAX_AGE

  if (isJsRequest(req)) {
    maxAge = JS_MAX_AGE
  }

  res.setHeader('Cache-Control', `max-age=${maxAge}`)
}

function isJsRequest (req) {
  const regex = /\.js$/i
  return regex.test(req.path)
}

module.exports = setCacheHeaders
