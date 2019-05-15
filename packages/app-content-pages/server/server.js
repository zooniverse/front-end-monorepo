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
    handleNextRequests(req, res)
  })

  server.listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  })
})
