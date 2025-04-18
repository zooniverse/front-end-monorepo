import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { dependencies, peerDependencies } from './package.json'

// https://vite.dev/config/
// https://vite.dev/guide/build.html#library-mode

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false, // maybe enable this and copy translation dictionaries from /public
    // define: {
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    // },
    lib: { // Library Mode
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es']
    },
    rollupOptions: {
      // Do not include deps and peerDeps in the bundled code intended for export
      // Vite doesn't know to do this automatically, so we use the `build.external` property.
      // All of these are already available in the Next.js app-root
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        'next/link', // not caught by peerDep 'next'
        'next/script',
        'react/jsx-runtime', // not caught by peerDep 'react
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
