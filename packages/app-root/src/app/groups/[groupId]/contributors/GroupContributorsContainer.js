'use client'

import { Contributors } from '@zooniverse/user'
import { useContext } from 'react'
import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'

import { PanoptesAuthContext } from '../../../../contexts'

function ContributorsContainer({ groupId, joinToken }) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <>
      {isLoading ? (
        <Box as='main' height='100vh' align='center' justify='center'>
          <Loader />
        </Box>
      ) : (
        <Contributors
          adminMode={adminMode}
          authUser={user}
          groupId={groupId}
          joinToken={joinToken}
        />
      )}
    </>
  )
}

export default ContributorsContainer
