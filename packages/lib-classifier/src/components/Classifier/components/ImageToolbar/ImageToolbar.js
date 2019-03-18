import { Box } from 'grommet'
import { shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withTheme } from 'styled-components'

import AnnotateButton from './components/AnnotateButton'
import FieldGuideButton from './components/FieldGuideButton'
import MoveButton from './components/MoveButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'

@withTheme
class ImageToolbar extends Component {
  render () {
    const { theme: { mode }, ...props } = this.props

    return (
      <Box as='aside' {...props}>
        <Box
          background={mode === 'light' ? 'white' : 'dark-3'}
          border={{
            color: mode === 'light' ? 'light-3' : 'dark-3',
            side: 'all'
          }}
          direction='column'
          fill
          pad='small'
        >
          <AnnotateButton />
          <MoveButton />
          <ZoomInButton />
          <ZoomOutButton />
        </Box>
        <FieldGuideButton />
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
