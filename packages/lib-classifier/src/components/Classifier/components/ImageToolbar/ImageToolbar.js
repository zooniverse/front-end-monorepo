import { Box } from 'grommet'
import { shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withTheme } from 'styled-components'

import AnnotateButton from './components/AnnotateButton'
import FieldGuideButton from './components/FieldGuideButton'
import FullscreenButton from './components/FullscreenButton'
import MoveButton from './components/MoveButton'
import ResetButton from './components/ResetButton'
import RotateButton from './components/RotateButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'

@withTheme
class ImageToolbar extends Component {
  render () {
    const { theme: { mode }, ...props } = this.props
    // const mode = theme.mode
    return (
      <aside {...props}>
        <Box
          background={ mode === 'light' ? 'white' : '#333' }
          border={{
            color: mode === 'light' ? 'lightGrey' : '#333',
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
}


ImageToolbar.propTypes = {
  theme: shape({
    mode: string
  })
}

export default ImageToolbar
