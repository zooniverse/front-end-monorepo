const webpack = require('webpack')

const webpackConfig = require('../webpack.dist')

function webpackFinal(config, options) {
  config.plugins.concat(webpackConfig.plugins)
  config.plugins.concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ])

  const resolve = {
    ...config.resolve,
    alias: {
      ...webpackConfig.resolve.alias,
      process: 'process/browser'
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
    '@storybook/addon-a11y'
  ],
  webpackFinal
};