import { setUser } from '@sentry/browser'

export default function addSentryUser(user) {
  const sentryUser = user ? { id: user.id, username: user.login } : null
  setUser(sentryUser)
}
