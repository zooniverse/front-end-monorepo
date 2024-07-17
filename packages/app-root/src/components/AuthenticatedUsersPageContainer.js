'use client'

import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'

function AuthenticatedUsersPageContainer({
  adminMode,
  children,
  isLoading,
  login,
  user
}) {
  if (isLoading) {
    return (
      <Box as='main' height='100vh' align='center' justify='center'>
        <Loader />
      </Box>
    )
  }

  if (!user) {
    return <p>Please log in.</p>
  }

  if (user && login !== user?.login && !adminMode) {
    return <p>Not authorized.</p>
  }

  return <>{children}</>
}

export default AuthenticatedUsersPageContainer
