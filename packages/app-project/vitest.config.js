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
    // you might want to disable the css propery here, if you don't have tests that rely on CSS since parsing CSS is slow
    css: true
    // testTimeout: 10000 // default is 5000ms, and some tests occasionally take longer than 5000ms during CI
  }
})
