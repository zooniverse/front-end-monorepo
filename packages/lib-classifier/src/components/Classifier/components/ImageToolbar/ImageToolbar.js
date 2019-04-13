import { Box } from 'grommet'
import { shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withTheme } from 'styled-components'

import AnnotateButton from './components/AnnotateButton'
import FieldGuide from '../FieldGuide'
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
      <Box as='aside' {...props}>
        <Box
          background={{
            dark: 'dark-3',
            light: 'white'
          }}
          border={{
            color: mode === 'light' ? 'light-3' : 'dark-3',
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

ImageToolbar.propTypes = {
  theme: shape({
    mode: string
  })
}

export default ImageToolbar
