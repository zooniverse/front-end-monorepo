const Sentry = require('@sentry/node')
import { BrowserTracing } from '@sentry/browser'

export default function initializeSentry() {
  const isBrowser = typeof window !== 'undefined'
  const dsn = process.env.SENTRY_PROJECT_DSN
  const environment = process.env.APP_ENV
  const release = process.env.COMMIT_ID
  const integrations = isBrowser ?
    [new BrowserTracing()] :
    [...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()]
  const tracesSampleRate = 1.0
  const ignoreErrors = [
    'ResizeObserver loop limit exceeded' // Ignore benign error: https://github.com/WICG/resize-observer/issues/38
  ]
  console.log('Initialising Sentry:', dsn, environment, release)

  if (dsn) {
    Sentry.init({
      dsn,
      environment,
      integrations,
      release,
      tracesSampleRate,
      ignoreErrors
    })
  }

  return null
}
