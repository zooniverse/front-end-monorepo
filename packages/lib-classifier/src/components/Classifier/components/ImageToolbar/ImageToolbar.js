import { Box } from 'grommet'
import React from 'react'

import AnnotateButton from './components/AnnotateButton'
import FieldGuideButton from './components/FieldGuideButton'
import FullscreenButton from './components/FullscreenButton'
import MoveButton from './components/MoveButton'
import ResetButton from './components/ResetButton'
import RotateButton from './components/RotateButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'

export default function ImageToolbar (props) {
  return (
    <aside {...props}>
      <Box
        background='white'
        border={{
          color: 'lightGrey',
          side: 'all'
        }}
        pad='small'
      >
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
