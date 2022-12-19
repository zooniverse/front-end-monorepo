const { execSync } = require('child_process')
const path = require('path')
const webpack = require('webpack')

function gitCommit() {
  try {
    const commitHash = execSync('git describe --always').toString('utf8').trim()
    return commitHash
  } catch (error) {
    console.log(error)
    return 'Not a git repository.'
  }
}

const EnvironmentWebpackPlugin = new webpack.EnvironmentPlugin({
  COMMIT_ID: gitCommit(),
  DEBUG: false,
  NODE_ENV: 'production',
  PANOPTES_ENV: 'production'
})

module.exports = {
  entry: './src/components/Classifier/index.js',
  externals: [
    '@zooniverse/grommet-theme',
    '@zooniverse/panoptes-js',
    '@zooniverse/react-components',
    'grommet',
    'grommet-icons',
    'react',
    'react-dom',
    'styled-components'
  ],
  mode: 'production',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@plugins': path.resolve(__dirname, 'src/plugins'),
      '@shared': path.resolve(__dirname, 'src/components/Classifier/components/shared'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@stories': path.resolve(__dirname, 'src/stories'),
      '@test': path.resolve(__dirname, 'test'),
      '@translations': path.resolve(__dirname, 'src/translations'),
      '@viewers': path.resolve(__dirname, 'src/components/Classifier/components/SubjectViewer')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '',
    filename: 'main.js',
    library: '@zooniverse/classifier',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    EnvironmentWebpackPlugin
  ]
}
