'use client'

import { useContext } from 'react'
import { Box } from 'grommet'
import { PanoptesAuthContext } from '../contexts'
import { CommunityContainer } from '@zooniverse/content'

export default function HomePageContainer({
  dailyZooPosts = [],
  zooBlogPosts = []
}) {
  const { isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <main>
      {isLoading ? (
        <Box height='100vh' align='center' justify='center'>
          Loader goes here
        </Box>
      ) : (
        <Box height='100vh' align='center' justify='center'>
          <p>{user?.login ? 'Signed-in' : 'Signed-out'}</p>
        </Box>
      )}
      <CommunityContainer
        dailyZooPosts={dailyZooPosts}
        zooBlogPosts={zooBlogPosts}
      />
    </main>
  )
}
