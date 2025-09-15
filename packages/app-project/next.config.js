if (process.env.NEWRELIC_LICENSE_KEY) {
  require('newrelic')
}

const { execSync } = require('child_process')
const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs')
const { i18n } = require('./next-i18next.config')

const assetPrefixes = {}

function commitID() {
  try {
    return execSync('git rev-parse HEAD').toString('utf8').trim()
  } catch (error) {
    return error.message
  }
}

function branchName() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString('utf8').trim()
  } catch (error) {
    return error.message
  }
}

const isDevelopment = process.env.NODE_ENV === 'development'
const PANOPTES_ENV = process.env.PANOPTES_ENV || 'staging'
const webpackConfig = require('./webpack.config')
const SENTRY_PROJECT_DSN = isDevelopment ? '' : 'https://2a50683835694829b4bc3cccc9adcc1b@sentry.io/1492691'
const APP_ENV = process.env.APP_ENV || 'development'
const COMMIT_ID = process.env.COMMIT_ID || commitID()
const assetPrefix = assetPrefixes[APP_ENV]
const GITHUB_REF_NAME = process.env.GITHUB_REF_NAME || branchName()

console.info({ GITHUB_REF_NAME, APP_ENV, PANOPTES_ENV, assetPrefix })

const nextConfig = {
  assetPrefix,
  basePath: '/projects',

  compiler: {
    styledComponents: true,
  },

  compress: false,

  env: {
    GITHUB_REF_NAME,
    COMMIT_ID,
    PANOPTES_ENV,
    SENTRY_PROJECT_DSN,
    APP_ENV
  },

  experimental: {
    forceSwcTransforms: true,
    instrumentationHook: true,
    optimizePackageImports: ['@zooniverse/react-components', 'grommet', 'grommet-icons']
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
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...webpackConfig.resolve.alias
      },
      fallback: {
        ...config.resolve.fallback,
        ...webpackConfig.resolve.fallback
      }
    }
    return config
  }
}

module.exports = withSentryConfig(nextConfig, {
    org: 'zooniverse-27',
    project: 'fem-app-project',
    sourcemaps: {
      disable: true,
    },
    telemetry: false,
    authToken: process.env.SENTRY_AUTH_TOKEN
  })
