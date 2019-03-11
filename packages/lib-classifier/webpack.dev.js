const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  DEBUG: false,
  NODE_ENV: 'development',
  PANOPTES_ENV: 'staging'
})

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './dev/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devServer: {
    allowedHosts: [
      'localhost',
      '.zooniverse.org'
    ]
  },
  entry: [
    '@babel/polyfill',
    './dev/index.js'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { compact: false }
        }]
      }
    ]
  },
  output: {
    path: path.resolve('build'),
    filename: 'main.js',
    library: '@zooniverse/classifier',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    EnvironmentWebpackPlugin,
    HtmlWebpackPluginConfig
  ],
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('./node_modules/styled-components')
    },
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
}
