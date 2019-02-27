const path = require('path')

module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.resolve.alias['styled-components'] = path.resolve('.', 'node_modules', 'styled-components')

    return config
  }
}
