const webpackConfig = require('../webpack.dev')

function webpackFinal(config, options) {
  const resolve = {
    ...config.resolve,
    alias: webpackConfig.resolve.alias
  }

  return { ...config, resolve }
}

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-a11y'
  ],
  webpackFinal
};
