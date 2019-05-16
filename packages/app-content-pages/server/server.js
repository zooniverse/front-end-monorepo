const next = require('next')
const http = require('http')

const DEFAULT_MAX_AGE = process.env.DEFAULT_MAX_AGE || 60 // 1 minute
const JS_MAX_AGE = process.env.JS_MAX_AGE || 31536000 // 1 year

const assetPrefix = process.env.ASSET_PREFIX || ''
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const app = next({ dev })
const handleNextRequests = app.getRequestHandler()

app.prepare().then(() => {
  const server = new http.Server((req, res) => {
    app.setAssetPrefix(assetPrefix)

    if (!dev) {
      setCacheHeaders(req, res)
    }

    handleNextRequests(req, res)
  })

  server.listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})

function setCacheHeaders (req, res) {
  let maxAge = DEFAULT_MAX_AGE

  if (isJsRequest(req)) {
    maxAge = JS_MAX_AGE
  }

  res.setHeader('Cache-Control', `max-age=${maxAge}`)
}

function isJsRequest(req) {
  const regex = /\.js$/i
  return regex.test(req.path)
}
