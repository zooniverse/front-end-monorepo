const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const pathMatch = require('path-match')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const route = pathMatch()

const match = route('/projects/:owner/:slug/:subroute*')

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname, query } = parse(req.url, true)
      const params = match(pathname)
      if (params === false) {
        handle(req, res)
        return
      }

      // assigning `query` into the params means that we still
      // get the query string passed to our application
      // i.e. /blog/foo?show-comments=true
      function appRender (path) {
        return app.render(req, res, path, Object.assign(params, query))
      }

      if (!params.subroute) {
        return appRender('/home')
      }

      if (params.subroute.includes('classify')) {
        return appRender('/classify')
      }

      if (params.subroute.includes('about')) {
        return appRender('/about')
      }
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
