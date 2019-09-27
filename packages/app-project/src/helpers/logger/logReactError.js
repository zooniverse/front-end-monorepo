import * as Sentry from '@sentry/browser'

export default function logReactError (error, errorInfo) {
  const dsn = process.env.SENTRY_DSN

  if (dsn) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  return null
}
