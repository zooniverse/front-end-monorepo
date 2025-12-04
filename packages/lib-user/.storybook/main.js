import vitetestConfig from '../vitest.config.js'

const config = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
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
