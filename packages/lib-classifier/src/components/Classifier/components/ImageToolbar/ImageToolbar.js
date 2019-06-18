import { Box } from 'grommet'
import React, { Component } from 'react'

import FieldGuide from '../FieldGuide'
import AnnotateButton from './components/AnnotateButton'
import FullscreenButton from './components/FullscreenButton'
import MoveButton from './components/MoveButton'
import ResetButton from './components/ResetButton'
import RotateButton from './components/RotateButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'
import withKeyZoom from '../withKeyZoom'

@withKeyZoom
class ImageToolbar extends Component {
  render () {
    return (
      <Box {...this.props}>
        <Box
          background={{
            dark: 'dark-3',
            light: 'white'
          }}
          border={{
            color: {
              dark: 'dark-1',
              light: 'light-3'
            },
            side: 'all'
          }}
          direction='column'
          fill
          pad='12px'
        >
          <AnnotateButton />
          <MoveButton />
          <ZoomInButton />
          <ZoomOutButton />
          <RotateButton disabled />
          <FullscreenButton disabled />
          <ResetButton />
        </Box>
        <FieldGuide />
      </Box>
    )
  }
}

export default ImageToolbar
