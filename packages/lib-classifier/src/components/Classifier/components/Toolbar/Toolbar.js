import React from 'react'
import { Box } from 'grommet'

const toolbarStyles = {
  pad: 'small',
  border: {
    color: 'lightGrey',
    side: 'all'
  }
}

function Toolbar () {
  return (
    <Box {...toolbarStyles}>Toolbar</Box>
  )
}

export default Toolbar
