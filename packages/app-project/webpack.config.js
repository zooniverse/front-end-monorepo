const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@stores': path.resolve(__dirname, 'stores'),
      '@test': path.resolve(__dirname, 'test')
    }
  }
}
