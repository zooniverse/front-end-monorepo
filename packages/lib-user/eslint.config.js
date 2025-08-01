const babelParser = require('@babel/eslint-parser')
const jsxA11y = require('eslint-plugin-jsx-a11y')
const reactRecommended = require('eslint-plugin-react/configs/recommended')
const jsxRuntime = require('eslint-plugin-react/configs/jsx-runtime')

module.exports = [
  {
    settings: {
      react: {
        version: 'detect'
      }
    },
    ...reactRecommended
  },
  jsxRuntime,
  {
    files: [
      'src/**/*.js'
    ],
    ignores: [
      'src/**/*.spec.jsx',
      'src/**/*.stories.jsx'
    ],
    languageOptions: {
      parser: babelParser,
      ...reactRecommended.languageOptions
    },
    plugins: {
      'jsx-a11y': jsxA11y
    },
    rules: {
      ...jsxA11y.configs.recommended.rules
    }
  }
]
