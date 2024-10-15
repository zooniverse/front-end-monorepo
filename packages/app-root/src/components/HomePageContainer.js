'use client'

import { useContext } from 'react'
import { Box } from 'grommet'
import { PanoptesAuthContext } from '../contexts'
import { DefaultHome } from '@zooniverse/content'
import { UserHome } from '@zooniverse/user'
import { Loader } from '@zooniverse/react-components'

export default function HomePageContainer({
  dailyZooPosts = [],
  zooBlogPosts = []
}) {
  const { isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <>
      {isLoading ? (
        <Box as='main' height='100vh' align='center' justify='center'>
          <Loader />
        </Box>
      ) : (
        <Box height={{ min: '100vh' }}>
          {user?.login ? (
            <UserHome
              authUser={user}
              dailyZooPosts={dailyZooPosts}
              zooBlogPosts={zooBlogPosts}
            />
          ) : (
            <DefaultHome
              dailyZooPosts={dailyZooPosts}
              zooBlogPosts={zooBlogPosts}
            />
          )}
        </Box>
      )}
    </>
  )
}
