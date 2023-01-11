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
const dev = process.env.NODE_ENV !== 'production'

const APP_ENV = process.env.APP_ENV || 'development'

const hostnames = {
  development: 'local.zooniverse.org',
  branch: 'fe-project-branch.preview.zooniverse.org',
  staging: 'frontend.preview.zooniverse.org',
  production : 'www.zooniverse.org'
}
const hostname = hostnames[APP_ENV]

const keyExists = fs.existsSync('server.key')
const certExists = fs.existsSync('server.cert')

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

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
