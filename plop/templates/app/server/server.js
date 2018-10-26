const { createServer } = require('http')
const next = require('next')
const { parse } = require('url')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      function renderPage (path) {
        return app.render(req, res, path, query)
      }

      // Show an explanation page at the root when running the app
      // in development.
      if (dev && req.url === '/') {
        return renderPage('/Index')
      }

      // Show an example public page
      if (pathname === '/public') {
        return renderPage('/Public')
      }

      // Handle anything else, e.g. 404s
      handle(req, res, parsedUrl)
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
