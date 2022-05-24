if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')()
const { i18n } = require('./next-i18next.config')

const talkHosts = require('./config/talkHosts')

function commitID () {
  try {
    return execSync('git rev-parse HEAD').toString('utf8').trim()
  } catch (error) {
    return error.message
  }
}

const basePath = '/projects'
const PANOPTES_ENV = process.env.PANOPTES_ENV || 'staging'
const webpackConfig = require('./webpack.config')
const assetPrefix = process.env.PROJECT_ASSET_PREFIX || basePath
const SENTRY_PROJECT_DSN = process.env.SENTRY_PROJECT_DSN
const APP_ENV = process.env.APP_ENV || 'production'
const COMMIT_ID = process.env.COMMIT_ID || commitID()

console.info(PANOPTES_ENV, talkHosts[PANOPTES_ENV])

const nextConfig = {
  assetPrefix,
  basePath,

  env: {
    COMMIT_ID,
    PANOPTES_ENV,
    SENTRY_PROJECT_DSN,
    APP_ENV,
    TALK_HOST: talkHosts[PANOPTES_ENV]
  },

  async headers() {
    return [
      {
        source: '/commit_id.txt',
        headers: [
          {
            key: 'cache-control',
            value: 'public, max-age=60'
          }
        ]
      }
    ]
  },

  /** localeDetection is a Next.js feature, while the rest of i18n config pertains to next-i18next */
  i18n: {
    localeDetection: false,
    ...i18n
  },

  publicRuntimeConfig: {
    assetPrefix
  },

  async redirects() {
    return [
      {
        source: '/:owner/:project/about',
        destination: '/:owner/:project/about/research',
        permanent: true
      }
    ]
  },

  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }
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
