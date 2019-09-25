const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  }
}