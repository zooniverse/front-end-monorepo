'use client'

import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'

function RootLoading() {
  return (
    <Box as='main' height='100vh' align='center' justify='center'>
      <Loader />
    </Box>
  )
}

export default RootLoading
