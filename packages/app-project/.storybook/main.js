const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpackConfig = require('../webpack.config')

function webpackFinal(config, options) {
  config.plugins.concat([
    new Dotenv({
      path: path.join(__dirname, '../.env'),
      systemvars: true
    })
  ])

  const resolve = {
    ...config.resolve,
    alias: {
      ...webpackConfig.resolve.alias,
      ['@sentry/node']: '@sentry/browser'
    }
  }

  return { ...config, resolve }
}

module.exports = {
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
