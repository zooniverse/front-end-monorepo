import * as Sentry from '@sentry/browser'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_DSN
  console.log('Sentry DSN', dsn)

  if (dsn) {
    console.log('initialising Sentry logger')
    Sentry.init({ dsn })
  }

  return null
}
