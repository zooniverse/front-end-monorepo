const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, 'src/api'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@shared': path.resolve(__dirname, 'src/shared')
    }
  }
}
