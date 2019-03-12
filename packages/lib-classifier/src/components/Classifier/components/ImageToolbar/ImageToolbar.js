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

    return (
      <aside {...props}>
        <Box
          background={mode === 'light' ? 'white' : 'dark-3'}
          border={{
            color: mode === 'light' ? 'light-3' : 'dark-3',
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
