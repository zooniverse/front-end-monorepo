import React from 'react'
import { Box } from 'grommet'
import AnnotateButton from './components/AnnotateButton'
import FieldGuideButton from './components/FieldGuideButton'
import FullscreenButton from './components/FullscreenButton'
import MoveButton from './components/MoveButton'
import ResetButton from './components/ResetButton'
import RotateButton from './components/RotateButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'

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
        <AnnotateButton />
        <MoveButton />
        <ZoomInButton />
        <ZoomOutButton />
        <RotateButton />
        <FullscreenButton />
        <ResetButton />
      </Box>
      <FieldGuideButton />
    </aside>
  )
}

export default ImageToolbar
