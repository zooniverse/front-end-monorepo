import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/index.js',
    external: [
      'react',
      'grommet'
    ],
    output: {
      name: '@zooniverse/testlib',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      resolve(),
      babel({
        exclude: ['node_modules/**'],
      }),
      commonjs(),
    ]
  },

  {
    input: 'src/index.js',
    external: [
      'react',
      'grommet'
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      })
    ]
  }
]
