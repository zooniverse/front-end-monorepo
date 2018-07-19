import { Box } from 'grommet'
import React from 'react'

const toolbarStyles = {
  border: {
    color: 'lightGrey',
    side: 'all'
  },
  pad: 'small'
}

function ImageToolbar (props) {
  return (
    <aside {...props}>
      <Box {...toolbarStyles}>
        Image toolbar
      </Box>
    </aside>
  )
}

export default ImageToolbar
