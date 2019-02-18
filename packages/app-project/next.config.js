const path = require('path')

module.exports = {
  // Disable file-system routing
  // https://github.com/zeit/next.js#disabling-file-system-routing
  useFileSystemPublicRoutes: false,

  webpack: (config) => {
    const modifiedConfig = Object.assign({}, config)

    modifiedConfig.resolve.alias['styled-components'] = path.resolve('.', 'node_modules', 'styled-components')

    return modifiedConfig
  }
}
