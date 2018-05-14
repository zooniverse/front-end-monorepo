module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js?$/,
      loader: 'standard-loader',
      exclude: /(node_modules)/,
      options: {
        parser: 'babel-eslint'
      }
    })
    return config
  }
}
