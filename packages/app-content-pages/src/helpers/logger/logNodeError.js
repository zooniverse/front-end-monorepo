import { captureException } from '@sentry/nextjs'

export default function logNodeError (error) {
  const dsn = process.env.SENTRY_CONTENT_DSN

  if (dsn) {
    captureException(error)
  }

  return null
}
