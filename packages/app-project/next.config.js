const path = require('path')

module.exports = {
  // Disable file-system routing
  // https://github.com/zeit/next.js#disabling-file-system-routing
  useFileSystemPublicRoutes: false,

  env: {
    PANOPTES_ENV: process.env.PANOPTES_ENV || 'staging'
  },

  webpack: (config) => {
    const modifiedConfig = Object.assign({}, config)

    modifiedConfig.resolve.alias['styled-components'] = path.resolve('.', 'node_modules', 'styled-components')

    return modifiedConfig
  }
}
