import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@translations': resolve(__dirname, 'src/translations'),
      '@utils': resolve(__dirname, 'src/utils')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    // you might want to disable the css propery here, if you don't have tests that rely on CSS since parsing CSS is slow
    css: true
    // testTimeout: 10000 // default is 5000ms
  }
})
