import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

import webpackConfig from './webpack.config.js'

export default defineConfig({
  plugins: [react()],
  resolve: {
    ...webpackConfig.resolve,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    // disable the css propery here since parsing CSS is slow
    css: false,
    testTimeout: 10000 // default is 5000ms, and some tests occasionally take longer than 5000ms during CI
  }
})
