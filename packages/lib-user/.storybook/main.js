import vitetestConfig from '../vitest.config.js'

const config = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../storybook-public'], // needed for msw-storybook-addon
    webpackFinal: async config => {
    return {
      ...config,
      resolve: {
        ...vitetestConfig.resolve,
        extensions: ['.jsx', '.js', '...'],
        fallback: {
          fs: false
        }
      }
    }
  }
}
export default config
