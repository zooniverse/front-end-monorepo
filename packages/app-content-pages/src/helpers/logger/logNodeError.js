import * as Sentry from '@sentry/node'

export default function logNodeError (error) {
  const dsn = process.env.SENTRY_CONTENT_DSN

  if (dsn) {
    Sentry.captureException(error)
  }

  return null
}
