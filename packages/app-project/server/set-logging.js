// Sets up morgan for request logging in production

const morgan = require('morgan')
const process = require('process')

const production = process.env.NODE_ENV === 'production'

function setLogging (expressInstance) {
  if (production) {
    expressInstance.use(morgan('combined', {
      skip: (req, res) => res.statusCode < 400,
      stream: process.stderr
    }))

    expressInstance.use(morgan('combined', {
      skip: (req, res) => res.statusCode >= 400,
      stream: process.stdout
    }))
  }
}

module.exports = setLogging
