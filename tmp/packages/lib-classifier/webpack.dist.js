const path = require('path')
const webpack = require('webpack')
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin')

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  DEBUG: false,
  NODE_ENV: 'production',
  PANOPTES_ENV: 'production'
})

// The peer deps external plugin doesn't work with scoped packages
// so we add them explicitly to webpack's externals config
// see: https://github.com/Updater/peer-deps-externals-webpack-plugin/issues/5
module.exports = {
  devtool: 'source-map',
  entry: './src/components/Classifier/index.js',
  externals: [
    /^(@zooniverse\/grommet-theme\/.*)$/i,
    /^(@zooniverse\/panoptes-js\/.*)$/i,
    /^(@zooniverse\/react-components\/.*)$/i
  ],
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
    new PeerDepsExternalsPlugin()
  ],
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
}
