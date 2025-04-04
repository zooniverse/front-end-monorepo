'use client'

import { Loader } from '@zooniverse/react-components'
import { Contributors, GroupAllProjects } from '@zooniverse/user'
import { useContext } from 'react'
import { Box } from 'grommet'

import { PanoptesAuthContext } from '../../../../contexts'

function GroupAllProjectsContainer({ groupId, joinToken }) {
  const { adminMode, isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <>
      {isLoading ? (
        <Box as='main' height='100vh' align='center' justify='center'>
          <Loader />
        </Box>
      ) : (
        <GroupAllProjects
          adminMode={adminMode}
          authUser={user}
          groupId={groupId}
          joinToken={joinToken}
        />
      )}
    </>
  )
}

export default GroupAllProjectsContainer
