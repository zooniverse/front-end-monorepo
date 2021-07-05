module.exports = {
  // uncomment this to build with webpack 5
  // core: {
//     builder: 'webpack5'
//   },
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-a11y'
  ]
};