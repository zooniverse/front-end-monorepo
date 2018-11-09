const path = require('path')

module.exports = {
  entry: './src/index.js',
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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

    // Workaround for webpack/webpack#6522
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  }
}
