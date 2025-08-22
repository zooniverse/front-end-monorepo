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
    extensions: ['.jsx', '.js', '...'],
    fallback: {
      ...webpackConfig.resolve.fallback,
      "url": false,
      crypto: false,
      fs: false,
      // for markdown-it
      path: 'path-browserify'
    }
  }

  return { ...config, resolve }
}

const config = {
  stories: ['../src/**/*.stories.jsx'],
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
  staticDirs: ['../public', '../storybook-public'],
  webpackFinal
}
export default config
