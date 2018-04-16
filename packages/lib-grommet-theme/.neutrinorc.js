module.exports = {
  options: {
    output: 'dist'
  },
  use: [
    '@neutrinojs/airbnb-base',
    [
      '@neutrinojs/library',
      {
        name: 'lib-grommet-theme'
      }
    ]
  ]
};
