var stdOpts = require('standard/options.js')
var stdVersion = require('standard/package.json').version

var pkg = require('./package.json')

var opts = Object.assign({}, stdOpts, {
  bugs: pkg.bugs.url,
  cmd: 'zoo-standard',
  eslintConfig: {
    baseConfig: require('standard/eslintrc.json'),
    parser: 'babel-eslint',
    envs: [
      'mocha'
    ],
    globals: [
      'expect'
    ],
    plugins: [
      'jsx-a11y'
    ],
    useEslintrc: false
  },
  homepage: pkg.homepage,
  tagline: 'Use JavaScript Standard Style (tweaked for the Zooniverse)',
  version: `${pkg.version} (standard ${stdVersion})`
})

module.exports = opts
