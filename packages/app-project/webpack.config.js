const path = require('path')
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@stores': path.resolve(__dirname, 'stores'),
      process: 'process/browser'
    },
    fallback: {
      console: false,
      domain: false,
      fs: false,
      http: false,
      https: false,
      net: false,
      os: false,
      process: 'process/browser',
      tls: false
    }
  }
}
