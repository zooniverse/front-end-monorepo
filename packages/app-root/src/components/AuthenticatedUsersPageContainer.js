'use client'

import { Loader, SpacedText } from '@zooniverse/react-components'
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

  if ((!user || Object.keys(user).length === 0)) {
    return (
      <Box as='main' height='100vh' align='center' justify='center'>
        <SpacedText uppercase={false}>
          Please log in.
        </SpacedText>
      </Box>
    )
  }

  if (user && login !== user?.login && !adminMode) {
    return (
      <Box as='main' height='100vh' align='center' justify='center'>
        <SpacedText uppercase={false}>
          Not authorized.
        </SpacedText>
      </Box>
    )
  }

  return <>{children}</>
}

export default AuthenticatedUsersPageContainer
