if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')()

const talkHosts = require('./config/talkHosts')

const PANOPTES_ENV = process.env.PANOPTES_ENV || 'staging'
const webpackConfig = require('./webpack.config')
const assetPrefix = process.env.ASSET_PREFIX || ''
const SENTRY_DSN = process.env.SENTRY_DSN

console.info(PANOPTES_ENV, talkHosts[PANOPTES_ENV])

const nextConfig = {
  assetPrefix,

  env: {
    COMMIT_ID: execSync('git rev-parse HEAD').toString('utf8').trim(),
    PANOPTES_ENV,
    SENTRY_DSN,
    TALK_HOST: talkHosts[PANOPTES_ENV]
  },

  publicRuntimeConfig: {
    assetPrefix
  },

  webpack: (config) => {
    config.plugins.concat([
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ])

    const newAliases = webpackConfig.resolve.alias
    const alias = Object.assign({}, config.resolve.alias, newAliases)
    config.resolve = Object.assign({}, config.resolve, { alias })
    return config
  }
}

module.exports = withSourceMaps(nextConfig)
