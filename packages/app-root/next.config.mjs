import withBundleAnalyzer from '@next/bundle-analyzer'
import { execSync } from 'child_process'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

function commitID() {
  try {
    return execSync('git rev-parse HEAD').toString('utf8').trim()
  } catch (error) {
    return error.message
  }
}

const COMMIT_ID = process.env.COMMIT_ID || commitID()

const nextConfig = {
  compress: false,
  env: {
    COMMIT_ID
  },
  experimental: {
    optimizePackageImports: [
      '@zooniverse/react-components',
      '@zooniverse/user',
      'grommet',
      'grommet-icons'
    ]
  },
  webpack: (config, options) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        hexoid: 'hexoid/dist/index.js'
      },
      fallback: {
        ...config.resolve.fallback,
        fs: false
      }
    }
    return config
  }
}

export default bundleAnalyzer(nextConfig)
