import * as Sentry from '@sentry/browser'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_DSN
  const environment = process.env.APP_ENV
  const release = `@zooniverse/fe-project@${process.env.COMMIT_ID}`
  console.log('Initialising Sentry:', dsn, environment, release)

  if (dsn) {
    Sentry.init({
      dsn,
      environment,
      release
    })
  }

  return null
}
