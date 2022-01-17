require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')()

function commitID () {
  try {
    return execSync('git rev-parse HEAD').toString('utf8').trim()
  } catch (error) {
    return error.message
  }
}

const PANOPTES_ENV = process.env.PANOPTES_ENV || 'staging'
const webpackConfig = require('./webpack.config')
const assetPrefix = process.env.CONTENT_ASSET_PREFIX || ''
const SENTRY_CONTENT_DSN = process.env.SENTRY_CONTENT_DSN
const APP_ENV = process.env.APP_ENV || 'production'
const COMMIT_ID = process.env.COMMIT_ID || commitID()

const nextConfig = {
  assetPrefix,
  basePath: '/about', 

  env: {
    COMMIT_ID,
    PANOPTES_ENV,
    SENTRY_CONTENT_DSN,
    APP_ENV
  },

  eslint: {
    ignoreDuringBuilds: true
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

