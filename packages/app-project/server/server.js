const { createServer } = require('http')
const next = require('next')
const pathMatch = require('path-match')
const { parse } = require('url')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()

const match = route('/projects/:owner/:project/:subroute*')

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname, query } = parse(req.url, true)

      // assigning `query` into the params means that we still
      // get the query string passed to our application
      // i.e. /blog/foo?show-comments=true
      function renderPage (path) {
        return app.render(req, res, path, Object.assign(params, query))
      }

      const params = match(pathname)

      if (params === false) {
        if (dev && req.url === '/') {
          return renderPage('/Index')
        }
      }

      if (!params.subroute) {
        return renderPage('/Home')
      }

      if (params.subroute && params.subroute[0] === 'classify') {
        return renderPage('/Classify')
      }

      if (params.subroute && params.subroute[0] === 'about') {
        return renderPage('/About')
      }

      // Finally handle any non-matching routes
      handle(req, res)
    })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
