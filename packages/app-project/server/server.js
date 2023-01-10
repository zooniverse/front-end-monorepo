if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

const express = require('express')
const next = require('next')
const https = require('https')
const fs = require('fs')

const setLogging = require('./set-logging')
const setCacheHeaders = require('./set-cache-headers')

const port = parseInt(process.env.PORT, 10) || 3000
const hostname = 'local.zooniverse.org'
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const keyExists = fs.existsSync('server.key')
const certExists = fs.existsSync('server.cert')

app.prepare().then(() => {
  const server = express()

  setLogging(server)

  server.get('*', (req, res) => {
    setCacheHeaders(req, res)
    return handle(req, res)
  })

  if (keyExists && certExists) {
    const key = fs.readFileSync('server.key')
    const cert = fs.readFileSync('server.cert')
    return https.createServer({ cert, key }, server)
      .listen(port, err => {
        if (err) throw err
        console.log(`> Ready on https://${hostname}:${port}`)
      })
  } else {
    return server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
    })
  }
})
