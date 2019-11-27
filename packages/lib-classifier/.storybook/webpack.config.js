const path = require('path')
const webpackConfig = require('../webpack.dev')

module.exports = async ({ config }) => {

  const newAliases = webpackConfig.resolve.alias
  const alias = Object.assign({}, config.resolve.alias, newAliases)
  config.resolve = Object.assign({}, config.resolve, { alias } )
  return config
}