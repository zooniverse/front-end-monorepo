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

const nextConfig = {
  env: {
    COMMIT_ID: process.env.COMMIT_ID || commitID(),
    PANOPTES_ENV: process.env.PANOPTES_ENV || 'staging'
  },

  webpack: (config) => {

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
}

function resolveHoisted (packageName) {
  return path.resolve(path.join(__dirname, '../../node_modules', packageName))
}

module.exports = withSourceMaps(nextConfig)

