import * as Sentry from '@sentry/browser'

export default function initializeSentry () {
  const dsn = process.env.SENTRY_DSN
  const release = `@zooniverse/fe-project@${process.env.COMMIT_ID}`

  if (dsn) {
    Sentry.init({
      dsn,
      release
    })
  }

  return null
}
