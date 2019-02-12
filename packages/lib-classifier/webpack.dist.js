const path = require('path')
const webpack = require('webpack')
const WorkboxPlugin = require('workbox-webpack-plugin')

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  DEBUG: false,
  NODE_ENV: 'production',
  PANOPTES_ENV: 'production'
})

const WorkboxPluginConfig = new WorkboxPlugin.InjectManifest({
  swSrc: './src/workers/queue.js'
})

module.exports = {
  entry: './src/components/Classifier/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader'
      }
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    library: '@zooniverse/classifier',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    EnvironmentWebpackPlugin,
    WorkboxPluginConfig
  ],
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
}
