const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
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
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
}
