import * as Sentry from '@sentry/node'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_PROJECT_DSN
  const environment = process.env.APP_ENV
  const release = process.env.COMMIT_ID
  const ignoreErrors = [
    'ResizeObserver loop limit exceeded' // Ignore benign error: https://github.com/WICG/resize-observer/issues/38
  ]
  console.log('Initialising Sentry:', dsn, environment, release)

  if (dsn) {
    Sentry.init({
      dsn,
      environment,
      release,
      ignoreErrors
    })
  }

  return null
}
