const path = require('path')
const webpack = require('webpack')
var createVariants = require('parallel-webpack').createVariants;

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  DEBUG: false,
  NODE_ENV: 'production',
  PANOPTES_ENV: 'staging'
})

var baseOptions = {
  preferredDevTool: process.env.DEVTOOL || 'eval'
};

// This object defines the potential option variants
// the key of the object is used as the option name, its value must be an array
// which contains all potential values of your build.
var variants = {
  target: [
    {
      targetEnv: 'client',
      libraryTarget: 'amd',
    },
    {
      targetEnv: 'server',
      libraryTarget: 'commonjs2',
    }
  ]
};

function createConfig (options) {
  var target = options.target
  var plugins = [
    EnvironmentWebpackPlugin
  ]

  return {
    devtool: options.preferredDevTool,
    entry: ['./src/index.', target.targetEnv, '.js'].join(''),
    externals: {
      mobx: {
        root: 'Mobx',
        commonjs2: 'mobx',
        commonjs: 'mobx',
        amd: 'mobx'
      },
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      }
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    output: {
      path: path.resolve('dist'),
      filename: ['index.', target.targetEnv, '.js'].join(''),
      libraryTarget: target.libraryTarget
    },
    plugins: plugins
  }
}

module.exports = createVariants(baseOptions, variants, createConfig)
