import vitestConfig from '../vitest.config.js'

const config = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    'storybook-react-i18next'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
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
          path: 'path-browserify',
        }
      }
    }
  }
}
export default config
