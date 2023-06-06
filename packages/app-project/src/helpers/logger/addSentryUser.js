import { setUser } from '@sentry/nextjs'

export default function addSentryUser(user) {
  const sentryUser = user ? { id: user.id, username: user.login } : null
  setUser(sentryUser)
}
