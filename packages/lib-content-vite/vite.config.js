import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
// https://vite.dev/guide/build.html#library-mode

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false, // maybe enable this and copy translation dictionaries from /public
    lib: { // Library Mode
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'i18next',
        'react-i18next',
        'grommet',
        '@zooniverse/grommet-theme'
      ]
    },
    outDir: 'dist', // default
    target: 'modules' // default, targets browsers with native ES modules
  }
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, 'lib'),
  //   },
  // },
})
