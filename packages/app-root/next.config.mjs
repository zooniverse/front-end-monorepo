import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@zooniverse/react-components', 'grommet', 'grommet-icons'],
  }
}

export default bundleAnalyzer(nextConfig)
