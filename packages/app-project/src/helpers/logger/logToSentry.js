import { withScope, captureException } from '@sentry/nextjs'

export default function logToSentry(error, errorInfo = {}) {
  const dsn = process.env.SENTRY_PROJECT_DSN

  if (dsn) {
    withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })
      captureException(error)
    })
  }

  return null
}
