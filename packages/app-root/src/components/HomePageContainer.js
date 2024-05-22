'use client'

import { useContext } from 'react'
import { Box } from 'grommet'
import { PanoptesAuthContext } from '../contexts'
import { CommunityContainer, DefaultHome } from '@zooniverse/content'
import { Loader } from '@zooniverse/react-components'

export default function HomePageContainer({
  dailyZooPosts = [],
  zooBlogPosts = []
}) {
  const { isLoading, user } = useContext(PanoptesAuthContext)

  return (
    <main>
      {isLoading ? (
        <Box height='100vh' align='center' justify='center'>
          <Loader />
        </Box>
      ) : (
        <Box height={{ min: '100vh' }}>
          {user?.login ? <p>Signed-in</p> : <DefaultHome />}
        </Box>
      )}
      <CommunityContainer
        dailyZooPosts={dailyZooPosts}
        zooBlogPosts={zooBlogPosts}
      />
    </main>
  )
}
