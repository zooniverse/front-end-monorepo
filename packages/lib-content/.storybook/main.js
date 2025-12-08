import vitetestConfig from '../vitest.config.js'

const config = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-a11y',
    'storybook-react-i18next'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
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
