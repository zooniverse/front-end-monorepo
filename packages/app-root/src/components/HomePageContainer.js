'use client'

import { useContext } from 'react'
import { Box } from 'grommet'
import { PanoptesAuthContext } from '../contexts'

export default function HomePageContainer({ blogPosts = [] }) {
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
      <Box pad='medium' align='center'>Number of blog posts: {blogPosts.length}</Box>
    </main>
  )
}
