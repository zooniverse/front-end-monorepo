const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    library: '@zooniverse/grommet-theme',
    libraryTarget: 'commonjs'
  }
}
