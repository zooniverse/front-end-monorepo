import * as Sentry from '@sentry/browser'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_DSN
  const appEnv = process.env.APP_ENV
  console.log('Sentry DSN', dsn)
  console.log('APP ENV', appEnv)

  if (dsn) {
    console.log('initialising Sentry logger')
    Sentry.init({
      dsn,
      environment: appEnv,
    })
  }

  return null
}
