// import withBundleAnalyzer from '@next/bundle-analyzer'

// const bundleAnalyzer = withBundleAnalyzer({
// 	enabled: process.env.ANALYZE === 'true',
// })

const nextConfig = {
  experimental: {
    optimizePackageImports: [
      '@zooniverse/react-components',
      '@zooniverse/user',
      'grommet',
      'grommet-icons'
    ],
  },
  webpack: (config, options) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        fs: false
      }
    }
    return config
  }
}

// export default bundleAnalyzer(nextConfig)
export default nextConfig
