const webpack = require('webpack')

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  DEBUG: false,
  NODE_ENV: 'development',
  PANOPTES_ENV: 'staging'
})

module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    // Add EnvironmentWebpackPlugin so env vars set on the command line are
    // passed through to WebPack / Next
    config.plugins.push(EnvironmentWebpackPlugin)

    return config
  }
}
