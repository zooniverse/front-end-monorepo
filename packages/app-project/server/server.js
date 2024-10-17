if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

const express = require('express')
const next = require('next')

const setLogging = require('./set-logging')

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

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  setLogging(server)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.use(function onError(error, req, res, next) {
    res.statusCode = 500
    res.end(res.sentry + "\n")
  })

  let selfsigned
  try {
    selfsigned = require('selfsigned')
  } catch (error) {
    console.error(error)
  }
  if (APP_ENV === 'development' && selfsigned) {
    const https = require('https')

    const attrs = [{ name: 'commonName', value: hostname }];
    const { cert, private: key } = selfsigned.generate(attrs, { days: 365 })
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
