const config = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    // '@storybook/addon-viewport',
    'storybook-react-i18next'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
export default config
