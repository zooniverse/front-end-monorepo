import * as Sentry from '@sentry/browser'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_DSN

  if (dsn) {
    Sentry.init({ dsn })
  }

  return null
}
