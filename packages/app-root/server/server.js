import express from 'express'
import next from 'next'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const APP_ENV = process.env.APP_ENV || 'development'

const hostnames = {
  development: 'local.zooniverse.org',
  staging: 'frontend.preview.zooniverse.org',
  production : 'www.zooniverse.org'
}
const hostname = hostnames[APP_ENV]

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = express()

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  let selfsigned
  try {
    selfsigned = await import('selfsigned')
  } catch (error) {
    console.info(error)
  }
  if (APP_ENV === 'development' && selfsigned) {
    const https = await import('https')

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
