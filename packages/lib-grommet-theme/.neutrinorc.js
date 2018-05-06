module.exports = {
  options: {
    output: 'dist'
  },
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/library',
      {
        name: 'lib-grommet-theme'
      }
    ]
  ]
};
