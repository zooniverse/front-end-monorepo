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
  compiler: {
    styledComponents: true
  },
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
  /*
    Legacy URL paths from PFE that were changed on launch of app-root.
    With and without a locale prefix. Not permanent just in case..
  */
  redirects() {
    return [
      {
        source: `/about/acknowledgements`,
        destination: '/about/resources',
        permanent: false
      },
      {
        source: `/:locale/about/acknowledgements`,
        destination: '/:locale/about/resources',
        permanent: false
      },
      {
        source: `/about/acknowledgments`,
        destination: '/about/resources',
        permanent: false
      },
      {
        source: `/:locale/about/acknowledgments`,
        destination: '/:locale/about/resources',
        permanent: false
      },
      {
        source: `/about/contact`,
        destination: '/about#contact',
        permanent: false
      },
      {
        source: `/:locale/about/contact`,
        destination: '/:locale/about#contact',
        permanent: false
      },
      {
        source: `/about/highlights`,
        destination: '/about#highlights',
        permanent: false
      },
      {
        source: `/:locale/about/highlights`,
        destination: '/:locale/about#highlights',
        permanent: false
      },
      {
        source: `/about/mobile-app`,
        destination: '/about#mobile',
        permanent: false
      },
      {
        source: `/:locale/about/mobile-app`,
        destination: '/:locale/about#mobile',
        permanent: false
      },
      {
        source: `/about/donate`,
        destination: '/get-involved/donate',
        permanent: false
      },
      {
        source: `/:locale/about/donate`,
        destination: '/:locale/get-involved/donate',
        permanent: false
      },
      {
        source: `/get-involved/call-for-projects`,
        destination: '/get-involved/collaborate',
        permanent: false
      },
      {
        source: `/:locale/get-involved/call-for-projects`,
        destination: '/:locale/get-involved/collaborate',
        permanent: false
      },
      {
        source: `/get-involved/education`,
        destination: '/get-involved/educate',
        permanent: false
      },
      {
        source: `/:locale/get-involved/education`,
        destination: '/:locale/get-involved/educate',
        permanent: false
      },
      {
        source: `/get-involved`,
        destination: '/get-involved/volunteer',
        permanent: false
      },
      {
        source: `/:locale/get-involved`,
        destination: '/:locale/get-involved/volunteer',
        permanent: false
      }
    ]
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

export default bundleAnalyzer(nextConfig)
