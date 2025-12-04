import vitestConfig from '../vitest.config.js'

const config = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-babel',
    'storybook-react-i18next'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: { strictMode: true }
  },
  webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...vitestConfig.resolve,
        extensions: ['.jsx', '.js', '...'],
        fallback: {
          fs: false,
          // for markdown-it plugins
          path: require.resolve("path-browserify"),
        }
      }
    }
  }
}
export default config
