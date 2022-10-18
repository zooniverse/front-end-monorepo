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
    react: 'react',
    'react-dom': 'react-dom',
    'styled-components': 'styled-components'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    library: {
      name: '@zooniverse/react-components',
      type: 'umd'
    },
    // Workaround for webpack/webpack#6522
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  plugins: [
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
