import * as Sentry from '@sentry/nextjs'

const dsn = process.env.SENTRY_PROJECT_DSN
const release = process.env.COMMIT_ID
const environment = process.env.APP_ENV

Sentry.init({
  dsn,
  environment,
  integrations: [Sentry.browserTracingIntegration()],
  release,
  tracesSampleRate: 1.0,
  ignoreErrors: [
    'ResizeObserver loop limit exceeded' // Ignore benign error: https://github.com/WICG/resize-observer/issues/38
  ]
})

console.log('Initialising Sentry (browser runtime):', dsn, environment, release)
