if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')

module.exports = {
  assetPrefix: process.env.ASSET_PREFIX || '',

  env: {
    COMMIT_ID: execSync('git rev-parse HEAD').toString('utf8').trim(),
    PANOPTES_ENV: process.env.PANOPTES_ENV || 'staging',
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
