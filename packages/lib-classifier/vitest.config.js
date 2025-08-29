import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@helpers': resolve(__dirname, 'src/helpers'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@plugins': resolve(__dirname, 'src/plugins'),
      '@shared': resolve(__dirname, 'src/components/Classifier/components/shared'),
      '@store': resolve(__dirname, 'src/store'),
      '@stories': resolve(__dirname, 'src/stories'),
      '@test': resolve(__dirname, 'test'),
      '@translations': resolve(__dirname, 'src/translations'),
      '@viewers': resolve(__dirname, 'src/components/Classifier/components/SubjectViewer')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    // you might want to disable the css propery here, if you don't have tests that rely on CSS since parsing CSS is slow
    css: true,
    // testTimeout: 10000 // default is 5000ms, and some tests lare known to occasionally take longer than 5000ms
    }
})
