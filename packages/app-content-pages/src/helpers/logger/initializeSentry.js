import * as Sentry from '@sentry/node'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_CONTENT_DSN
  const release = process.env.COMMIT_ID
  const environment = process.env.APP_ENV
  const ignoreErrors = [
    'ResizeObserver loop limit exceeded' // Ignore benign error: https://github.com/WICG/resize-observer/issues/38
  ]
  console.log('Initialising Sentry:', dsn, environment, release)
  if (dsn) {
    Sentry.init({
      dsn,
      release,
      environment,
      ignoreErrors
    })
  }

  return null
}
