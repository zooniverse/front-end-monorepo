import babelParser from '@babel/eslint-parser'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRecommended from 'eslint-plugin-react/configs/recommended'
import jsxRuntime from 'eslint-plugin-react/configs/jsx-runtime'

const eslintConfig = [
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
      'src/**/*.jsx',
      'src/**/*.js'
    ],
    ignores: [
      'src/**/*.spec.jsx',
      'src/**/*.spec.js',
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

export default eslintConfig
