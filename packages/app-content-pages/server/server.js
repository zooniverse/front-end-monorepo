const express = require('express')
const LRUCache = require('lru-cache')
const next = require('next')

const assetPrefix = process.env.ASSET_PREFIX || ''
const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1 hour
})

const app = next({ dir: '.', dev })

const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  app.setAssetPrefix(assetPrefix)

  server.get('/about/publications', (req, res) => {
    renderAndCache(req, res, '/about/publications', {})
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(error => {
  console.error(error.stack)
  process.exit(1)
})

function getCacheKey (req) {
  return req.url
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    if (dev || res.statusCode !== 200) {
      res.setHeader('x-cache', 'SKIP')
      res.send(html)
      return
    }

    ssrCache.set(key, html)
    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
