const config = {
  stories: ['../src/**/*.stories.js'],
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
  }
}
export default config
