import * as Sentry from '@sentry/node'

export default function logNodeError (error) {
  const dsn = process.env.SENTRY_PROJECT_DSN

  if (dsn) {
    Sentry.captureException(error)
  }

  return null
}
