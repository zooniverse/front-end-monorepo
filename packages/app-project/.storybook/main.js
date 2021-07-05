const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const webpackConfig = require('../webpack.config')

function webpackFinal(config, options) {
  config.plugins.concat(webpackConfig.plugins)
  config.plugins.concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Dotenv({
      path: path.join(__dirname, '../.env'),
      systemvars: true
    })
  ])

  const resolve = {
    ...config.resolve,
    alias: {
      ...webpackConfig.resolve.alias,
      process: 'process/browser',
      ['@sentry/node']: '@sentry/browser'
    },
    fallback: {
      ...webpackConfig.resolve.fallback,
      crypto: false,
      process: 'process/browser'
    }
  }

  return { ...config, resolve }
}

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource'
  ],
  webpackFinal
};
