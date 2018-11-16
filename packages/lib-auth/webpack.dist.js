const path = require('path')
const webpack = require('webpack')

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  DEBUG: false,
  NODE_ENV: 'production',
  PANOPTES_ENV: process.env.PANOPTES_ENV || 'production'
})

// TODO: get optimization config working
// Current it causes the exported initialization function to be undefined (createOAuthClient)
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
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    // chunkFilename: '[name].js',
    library: '@zooniverse/auth',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    EnvironmentWebpackPlugin
  ],
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
}
