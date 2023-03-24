import { withScope, captureException} from '@sentry/node'

export default function logReactError (error, errorInfo) {
  const dsn = process.env.SENTRY_CONTENT_DSN

  if (dsn) {
    withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key])
      });
      captureException(error)
    })
  }

  return null
}
