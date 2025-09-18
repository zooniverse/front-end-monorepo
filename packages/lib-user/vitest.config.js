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
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    // disable the css propery here since parsing CSS is slow
    css: false,
    testTimeout: 10000 // default is 5000ms
  },
})
