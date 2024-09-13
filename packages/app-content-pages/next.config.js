require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const { i18n } = require('./next-i18next.config')

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
const APP_ENV = process.env.APP_ENV || 'development'
const COMMIT_ID = process.env.COMMIT_ID || commitID()
const assetPrefix = assetPrefixes[APP_ENV]

console.info({ APP_ENV, PANOPTES_ENV, assetPrefix })

const nextConfig = {
  assetPrefix,

  compiler: {
    styledComponents: true,
  },

  compress: false,

  env: {
    COMMIT_ID,
    PANOPTES_ENV,
    APP_ENV
  },

  experimental: {
    forceSwcTransforms: true,
    optimizePackageImports: ['@zooniverse/react-components', 'grommet', 'grommet-icons']
  },

  /** localeDetection is a Next.js feature, while the rest of i18n config pertains to next-i18next */
  i18n: {
    localeDetection: false,
    ...i18n
  },

  reactStrictMode: true,

  webpack: (config, options) => {
    config.plugins.concat([
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ])

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

module.exports = nextConfig
