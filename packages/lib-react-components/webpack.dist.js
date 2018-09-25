const path = require('path')
const webpack = require('webpack')

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  DEBUG: false,
  NODE_ENV: 'development',
  PANOPTES_ENV: 'staging'
})

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
    library: '@zooniverse/react-components',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    EnvironmentWebpackPlugin
  ],
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
}
