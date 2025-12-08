import webpack from 'webpack'
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
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser.js' // For components that try to access process.env or process.browser
      })
    )
    return {
      ...config,
      resolve: {
        ...vitestConfig.resolve,
        extensions: ['.jsx', '.js', '...'],
        fallback: {
          fs: false,
          // for markdown-it plugins
          path: require.resolve('path-browserify')
        }
      }
    }
  }
}
export default config
