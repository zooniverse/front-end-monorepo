import stdOpts  from 'standard/lib/options.js'
import stdPackage from 'standard/package.json' assert { type: "json" }
import baseConfig from 'standard/eslintrc.json' assert { type: "json" }

import pkg  from './package.json' assert { type: "json" }

const opts = {
  ...stdOpts,
  bugs: pkg.bugs.url,
  cmd: 'zoo-standard',
  eslintConfig: {
    baseConfig,
    overrideConfig: {
      extends: [
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/jsx-runtime'
      ],
      globals: {
        'expect': true
      },
      parser: '@babel/eslint-parser',
      plugins: [
        'jsx-a11y',
        'react'
      ],
      rules: {
        "consistent-return": "error"
      }
    },
    useEslintrc: false
  },
  homepage: pkg.homepage,
  tagline: 'Use JavaScript Standard Style (tweaked for the Zooniverse)',
  version: `${pkg.version} (standard ${stdPackage.version})`
}

export default opts
