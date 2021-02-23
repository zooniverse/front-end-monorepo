const webpackConfig = require('./webpack.config')

const webpackTestConfig = Object.assign({}, webpackConfig)

webpackTestConfig.resolve.alias['@sentry/node'] = '@sentry/browser'

module.exports = webpackTestConfig
