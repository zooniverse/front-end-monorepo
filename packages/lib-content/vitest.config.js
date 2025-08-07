import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@translations': resolve(__dirname, 'src/translations')
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    // you might want to disable the css propery here, if you don't have tests that rely on CSS since parsing CSS is slow
    css: true,
  },
})
