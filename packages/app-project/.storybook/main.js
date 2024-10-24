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
      "url": false,
      crypto: false,
      fs: false,
      path: 'path-browserify'
    }
  }

  return { ...config, resolve }
}

const config = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    'storybook-react-i18next'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../public'],
  webpackFinal
}
export default config
