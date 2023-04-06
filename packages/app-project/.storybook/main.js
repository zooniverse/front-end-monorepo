const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const webpackConfig = require('../webpack.config')

function webpackFinal(config, options) {
  config.plugins.concat(webpackConfig.plugins)

  const resolve = {
    ...config.resolve,
    alias: {
      ...webpackConfig.resolve.alias,
      ['@sentry/node']: '@sentry/browser',
      'next-i18next': 'react-i18next'
    },
    fallback: {
      ...webpackConfig.resolve.fallback,
      crypto: false,
      path: 'path-browserify'
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
    '@storybook/addon-a11y',
    'storybook-react-i18next'
  ],
  webpackFinal
};
