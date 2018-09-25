const {resolve} = require('path');
const babelrc = require('../.babelrc');

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  defaultConfig.node = { fs: 'empty' }

  defaultConfig.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      use: [
        {
          loader: resolve(__dirname, '../', 'node_modules', 'babel-loader'),
          options: {
            cacheDirectory: true,
            ...babelrc,
          },
        },
      ],
      exclude: /node_modules/,
    }
  )

  return defaultConfig
}
