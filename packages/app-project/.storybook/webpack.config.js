const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')

module.exports = async ({ config }) => {
  config.plugins.concat([
    new Dotenv({
      path: path.join(__dirname, '../.env'),
      systemvars: true
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ])
  // config.plugins.concat(webpackConfig.plugins)

  const newAliases = webpackConfig.resolve.alias
  const alias = Object.assign({}, config.resolve.alias, newAliases)
  const fallback = Object.assign({}, config.resolve.fallback, webpackConfig.resolve.fallback)
  config.resolve = Object.assign({}, config.resolve, { alias, fallback } )

  return config
}