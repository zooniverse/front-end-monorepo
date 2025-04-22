import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

import { dependencies, peerDependencies } from './package.json'

// https://vite.dev/config/
// https://vite.dev/guide/build.html#library-mode

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: [/node_modules/, /lib-panoptes-js/],
      transformMixedEsModules: true,
    },
    copyPublicDir: false,
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
      ],
      output: {
        banner: '"use client";',
      }
    },
    outDir: 'dist', // default
    target: 'modules' // default, targets browsers with native ES modules
  },
  resolve: {
    alias: {
      '@translations': resolve(__dirname, 'src/translations'),
    },
  },
  optimizeDeps: {
    include: ['@zooniverse/panoptes-js'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    // you might want to disable the css propery here, if you don't have tests that rely on CSS since parsing CSS is slow
    css: true,
  },
})
