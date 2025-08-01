import { execSync }  from 'child_process'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import webpack from 'webpack'
const __dirname = import.meta.dirname

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

const webpackConfig = {
  devServer: {
    allowedHosts: [
      'bs-local.com',
      'localhost',
      '.zooniverse.org'
    ],
    server: 'https'
  },
  entry: [
    './dev/index.jsx'
  ],
  mode: 'development',
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@translations': resolve(__dirname, 'src/translations'),
      '@utils': resolve(__dirname, 'src/utils')
    },
    extensions: ['.jsx', '.js', '...'],
    fallback: {
      fs: false,
      // for markdown-it plugins
      path: import.meta.resolve("path-browserify"),
      process: false,
      url: false,
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
    path: resolve('build'),
    filename: 'main.js',
    library: '@zooniverse/user',
    // libraryTarget: 'umd',
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

export default webpackConfig
