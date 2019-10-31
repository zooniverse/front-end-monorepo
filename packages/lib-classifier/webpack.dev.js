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
    ],
    host: process.env.HOST || 'localhost'
  },
  entry: [
    '@babel/polyfill',
    './dev/index.js'
  ],
  mode: 'development',
  resolve: {
    alias: {
      '@plugins': path.resolve(__dirname, 'src/plugins'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@test': path.resolve(__dirname, 'test')
    }
  },
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
  ]
}
