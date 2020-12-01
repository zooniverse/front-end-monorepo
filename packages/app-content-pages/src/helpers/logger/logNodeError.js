import * as Sentry from '@sentry/browser'

export default function logNodeError (error) {
  const dsn = process.env.SENTRY_CONTENT_DSN

  if (dsn) {
    Sentry.captureException(error)
  }

  return null
}
