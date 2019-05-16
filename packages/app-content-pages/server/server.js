const next = require('next')
const http = require('http')

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
  let maxAge = 60 // 1 minute

  if (isJsRequest(req)) {
    maxAge = 31536000 // 1 year
  }

  res.setHeader('Cache-Control', `max-age=${maxAge}`)
}

function isJsRequest(req) {
  const regex = /\.(?:js)$/i
  return regex.test(req.path)
}
