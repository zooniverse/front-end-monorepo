const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
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
  externals: {
    '@zooniverse/grommet-theme': '@zooniverse/grommet-theme',
    grommet: 'grommet',
    'grommet-icons': 'grommet-icons',
    i18next: 'i18next',
    react: 'react',
    'react-dom': 'react-dom',
    'react-18next': 'react-i18next',
    'styled-components': 'styled-components'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    library: '@zooniverse/react-components',
    libraryTarget: 'umd',

    // Workaround for webpack/webpack#6522
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  plugins: [
    // uncomment this to build with the bundle analyser.
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ],
    fallback: { "path": require.resolve("path-browserify") }
  }
}
