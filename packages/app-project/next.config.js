if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

const { execSync } = require('child_process')
const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')()
const { i18n } = require('./next-i18next.config')

const talkHosts = require('./config/talkHosts')
const assetPrefixes = {}

function commitID () {
  try {
    return execSync('git rev-parse HEAD').toString('utf8').trim()
  } catch (error) {
    return error.message
  }
}

const PANOPTES_ENV = process.env.PANOPTES_ENV || 'staging'
const webpackConfig = require('./webpack.config')
const SENTRY_PROJECT_DSN = 'https://2a50683835694829b4bc3cccc9adcc1b@sentry.io/1492691'
const APP_ENV = process.env.APP_ENV || 'development'
const COMMIT_ID = process.env.COMMIT_ID || commitID()
const assetPrefix = assetPrefixes[APP_ENV]
const TALK_HOST = talkHosts[PANOPTES_ENV]

console.info({ APP_ENV, PANOPTES_ENV, TALK_HOST, assetPrefix })

const nextConfig = {
  assetPrefix,
  basePath: '/projects',

  compiler: {
    styledComponents: true,
  },

  env: {
    COMMIT_ID,
    PANOPTES_ENV,
    SENTRY_PROJECT_DSN,
    APP_ENV,
    TALK_HOST
  },

  experimental: {
    forceSwcTransforms: true,
    modularizeImports: {
      lodash: {
        transform: 'lodash/{{member}}',
      },
    },
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

  reactStrictMode: true,

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

    const newAliases = webpackConfig.resolve.alias
    const alias = Object.assign({}, config.resolve.alias, newAliases)
    config.resolve = Object.assign({}, config.resolve, { alias })
    return config
  }
}

module.exports = withSourceMaps(nextConfig)
