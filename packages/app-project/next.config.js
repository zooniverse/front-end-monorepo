const path = require('path')

module.exports = {
  // Disable file-system routing
  // https://github.com/zeit/next.js#disabling-file-system-routing
  useFileSystemPublicRoutes: false,

  env: {
    PANOPTES_ENV: process.env.PANOPTES_ENV || 'staging'
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      grommet: path.resolve('.', 'node_modules', 'grommet'),
      'grommet-icons': path.resolve('.', 'node_modules', 'grommet-icons'),
      'styled-components': path.resolve('.', 'node_modules', 'styled-components')
    }
    return config
  }
}
