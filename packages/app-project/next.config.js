require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')

const talkHosts = require('./config/talkHosts')

const PANOPTES_ENV = process.env.PANOPTES_ENV || 'staging'

console.info(PANOPTES_ENV, talkHosts[PANOPTES_ENV])

module.exports = {
  // Disable file-system routing
  // https://github.com/zeit/next.js#disabling-file-system-routing
  useFileSystemPublicRoutes: false,

  env: {
    COMMIT_ID: execSync('git rev-parse HEAD').toString('utf8').trim(),
    PANOPTES_ENV,
    TALK_HOST: talkHosts[PANOPTES_ENV]
  },

  webpack: (config) => {
    config.plugins.concat([
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ])

    return config
  }
}
