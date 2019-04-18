require('dotenv').config()

const { execSync } = require('child_process')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const { setAliases } = require('require-control')


// Fixes the FOUC due to SC not collecting styles from symlinked packages
// https://github.com/styled-components/styled-components/issues/2322
setAliases({
  'styled-components': path.resolve(
    path.join(__dirname, './node_modules/styled-components')
  )
})

module.exports = {
  env: {
    COMMIT_ID: execSync('git rev-parse HEAD').toString('utf8').trim(),
    PANOPTES_ENV: process.env.PANOPTES_ENV || 'staging'
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      grommet: resolveLocal('grommet'),
      'grommet-icons': resolveLocal('grommet-icons'),
      'styled-components': resolveLocal('styled-components')
    }

    config.plugins = config.plugins || []

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

function resolveLocal (packageName) {
  return path.resolve('.', 'node_modules', packageName)
}
