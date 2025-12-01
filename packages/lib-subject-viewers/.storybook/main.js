import vitestConfig from '../vitest.config.js'

const config = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-babel'
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
          // for markdown-it plugins in LRC's Markdownz
          path: 'path-browserify'
        }
      }
    }
  }
}

export default config
