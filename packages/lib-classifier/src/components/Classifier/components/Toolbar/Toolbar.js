import React from 'react'
import { Box } from 'grommet'
import Button from './components/Button'

const toolbarStyles = {
  pad: 'small',
  border: {
    color: 'lightGrey',
    side: 'all'
  }
}

function Toolbar () {
  return (
    <Box {...toolbarStyles}>
      Toolbar
      <Button />
    </Box>
  )
}

export default Toolbar
