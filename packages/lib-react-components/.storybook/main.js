function webpackFinal(config, options) {
  const resolve = {
    ...config.resolve,
    fallback: {
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
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-react-i18next'
  ],
  webpackFinal
};