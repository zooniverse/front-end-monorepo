const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpackConfig = require('../webpack.config')

module.exports = async ({ config }) => {
  config.plugins.concat([
    new Dotenv({
      path: path.join(__dirname, '../.env'),
      systemvars: true
    })
  ])

  const newAliases = webpackConfig.resolve.alias
  const alias = Object.assign({}, config.resolve.alias, newAliases)
  config.resolve = Object.assign({}, config.resolve, { alias } )
  return config
}