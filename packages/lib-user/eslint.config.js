import babelParser from '@babel/eslint-parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import jsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'

export default [
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
      'src/**/*.spec.js',
      'src/**/*.stories.js'
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
