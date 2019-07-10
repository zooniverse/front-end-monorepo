if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

const express = require('express')
const next = require('next')

const setAssetPrefix = require('./set-asset-prefix')
const setLogging = require('./set-logging')
const setCacheHeaders = require('./set-cache-headers')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

setAssetPrefix(app)

app.prepare().then(() => {
  const server = express()

  setLogging(server)

  server.get('*', (req, res) => {
    setCacheHeaders(req, res)
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
