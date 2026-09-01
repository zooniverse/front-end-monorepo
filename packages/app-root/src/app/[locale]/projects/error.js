'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Box, Button, Paragraph } from 'grommet'

// This component is designed to catch errors during rendering of the /projects route segment
export default function Error({ error }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Box
      background='light-1'
      height='400px'
      width='100%'
      align='center'
      justify='center'
      pad='15px'
    >
      <Paragraph textAlign='center'>
        Something went wrong! Please adjust your search params or try again
        later.
      </Paragraph>
    </Box>
  )
}
