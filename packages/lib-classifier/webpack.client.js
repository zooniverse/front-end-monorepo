const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.client.js',
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
    filename: 'classifier.client.js',
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
