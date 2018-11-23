const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.server.js',
  externals : {
    PropTypes: 'prop-types',
    react: 'react',
    reactDOM: 'react-dom'
  },
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
    filename: 'classifier.server.js',
    library: '@zooniverse/classifier',
    libraryTarget: 'commonjs2',
    umdNamedDefine: true,
  },
  plugins: [
  ],
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
}
