const express = require('express')
const next = require('next')
const devcert = require('devcert')
const https = require('https')

const setLogging = require('./set-logging')
const setCacheHeaders = require('./set-cache-headers')

const port = parseInt(process.env.PORT, 10) || 3000
const hostname = 'local.zooniverse.org'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  setLogging(server)

  server.get('*', (req, res) => {
    setCacheHeaders(req, res)
    return handle(req, res)
  })

  devcert.certificateFor([
    'local.zooniverse.org',
    'localhost.zooniverse.org'
  ]).then(cert => {
    return https.createServer(cert, server)
      .listen(port, err => {
        if (err) throw err
        console.log(`> Ready on https://${hostname}:${port}`)
      })
  }).catch(error => console.error(error))
})