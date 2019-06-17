if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

const http = require('http')
const next = require('next')

const configureNextServer = require('./configure-next-server')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = new http.Server((req, res) =>
    configureNextServer(app, req, res))

  server.listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})
