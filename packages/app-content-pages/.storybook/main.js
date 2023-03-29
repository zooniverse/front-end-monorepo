const webpackConfig = require('../webpack.config.js')

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async config => {
    const resolve = {
      ...webpackConfig.resolve,
      fallback: {
        crypto: false,
        path: 'path-browserify'
      }
    }

    return { ...config, resolve }
  }
}
