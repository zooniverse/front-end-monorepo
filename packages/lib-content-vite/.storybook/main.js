const config = {
  stories: ['../src/**/*.stories.jsx'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    'storybook-react-i18next'
  ],
  // This can be changed to framework: '@storybook/react-vite' in Storybook v8+
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  // core: {
  //   builder: '@storybook/builder-vite', // for use with @storybook/react-vite
  // },
  docs: {
    autodocs: 'tag'
  }
}
export default config
