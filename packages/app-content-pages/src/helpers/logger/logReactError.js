import * as Sentry from '@sentry/node'

export default function logReactError (error, errorInfo) {
  const dsn = process.env.SENTRY_CONTENT_DSN

  if (dsn) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      });
      Sentry.captureException(error)
    })
  }

  return null
}
