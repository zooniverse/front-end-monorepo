const { execSync } = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

function gitCommit() {
  try {
    const commitHash = execSync('git describe --always').toString('utf8').trim()
    return commitHash
  } catch (error) {
    console.log(error)
    return 'Not a git repository.'
  }
}

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  COMMIT_ID: gitCommit(),
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
      'bs-local.com',
      'localhost',
      '.zooniverse.org'
    ],
    host: process.env.HOST || 'localhost',
    server: 'https'
  },
  entry: [
    '@babel/polyfill',
    './dev/index.js'
  ],
  mode: 'development',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@plugins': path.resolve(__dirname, 'src/plugins'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@stories': path.resolve(__dirname, 'src/stories'),
      '@test': path.resolve(__dirname, 'test'),
      '@translations': path.resolve(__dirname, 'src/translations'),
      '@viewers': path.resolve(__dirname, 'src/components/Classifier/components/SubjectViewer')
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
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
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
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    EnvironmentWebpackPlugin,
    HtmlWebpackPluginConfig
  ]
}
