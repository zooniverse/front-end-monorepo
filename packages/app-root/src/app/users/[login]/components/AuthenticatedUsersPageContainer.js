'use client'

function AuthenticatedUsersPageContainer({
  adminMode,
  children,
  isLoading,
  login,
  user
}) {
  if (typeof window === 'undefined' || isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (!user) {
    return (
      <p>Please log in.</p>
    )
  }

  if (user && login !== user?.login && !adminMode) {
    return (
      <p>Not authorized.</p>
    )
  }

  return (
    <>{children}</>
  )
}

export default AuthenticatedUsersPageContainer
