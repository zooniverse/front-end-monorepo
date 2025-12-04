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
    reporters: ['default'],
    setupFiles: './test/setup.js',
    // disable the css propery here since parsing CSS is slow
    css: false,
    // silent: 'passed-only', // use this to silence console logs or errors except for tests tha failed
    // testTimeout: 10000 // default is 5000ms, and some tests are known to occasionally take longer than 5000ms
    }
})
