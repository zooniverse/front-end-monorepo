const path = require('path')

module.exports = {
  env: {
    PANOPTES_ENV: process.env.PANOPTES_ENV || 'staging'
  },

  exportPathMap: async function (defaultPathMap) {
    return {
      '/projects/nora-dot-eisner/test-json/classify': {
        page: '/Classify',
        query: {
          owner: 'nora-dot-eisner',
          project: 'test-json'
        }
      },
    }
  },

  useFileSystemPublicRoutes: false,

  webpack: (config) => {
    const modifiedConfig = Object.assign({}, config)

    modifiedConfig.resolve.alias['styled-components'] = path.resolve('.', 'node_modules', 'styled-components')

    return modifiedConfig
  }
}
