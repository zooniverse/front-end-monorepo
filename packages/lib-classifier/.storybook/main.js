const webpackConfig = require('../webpack.dev')

function webpackFinal(config, options) {
  config.plugins.concat(webpackConfig.plugins)

  const resolve = {
    ...config.resolve,
    alias: {
      ...webpackConfig.resolve.alias,
    },
    fallback: {
      ...webpackConfig.resolve.fallback,
      crypto: false,
      path: 'path-browserify',
      process: 'process'
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
    'storybook-react-i18next'
  ],
  webpackFinal
};
