require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const { setAliases } = require('require-control')
const withSourceMaps = require('@zeit/next-source-maps')()

// Fixes the FOUC due to SC not collecting styles from symlinked packages
// https://github.com/styled-components/styled-components/issues/2322
setAliases({
  'styled-components': resolveHoisted('styled-components')
})

function commitID () {
  return execSync('git rev-parse HEAD').toString('utf8').trim()
}

const PANOPTES_ENV = process.env.PANOPTES_ENV || 'staging'
const webpackConfig = require('./webpack.config')
const assetPrefix = process.env.ASSET_PREFIX || ''
const SENTRY_DSN = process.env.SENTRY_DSN
const APP_ENV = process.env.APP_ENV || 'production'
const COMMIT_ID = process.env.COMMIT_ID || commitID()

const nextConfig = {
  assetPrefix,

  env: {
    COMMIT_ID,
    PANOPTES_ENV,
    SENTRY_DSN,
    APP_ENV
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

function resolveHoisted (packageName) {
  return path.resolve(path.join(__dirname, '../../node_modules', packageName))
}

module.exports = withSourceMaps(nextConfig)

