import * as Sentry from '@sentry/browser'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_DSN
  const appEnv = process.env.APP_ENV

  if (dsn) {
    Sentry.init({
      dsn,
      environment: appEnv,
    })
  }

  return null
}
