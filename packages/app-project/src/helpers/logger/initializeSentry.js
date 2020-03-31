import * as Sentry from '@sentry/browser'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_DSN
  const appEnv = process.env.APP_ENV
  const release = `@zooniverse/fe-project@${process.env.COMMIT_ID}`

  if (dsn) {
    Sentry.init({
      dsn,
      environment: appEnv,
      release
    })
  }

  return null
}
