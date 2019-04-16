import { Box } from 'grommet'
import { inject } from 'mobx-react'
import { func, shape, string } from 'prop-types'
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

const PLUS = 187
const MINUS = 189

function storeMapper (stores) {
  const {
    zoomIn,
    zoomOut
  } = stores.classifierStore.subjectViewer

  return {
    zoomIn,
    zoomOut
  }
}

@withTheme
@inject(storeMapper)
class ImageToolbar extends Component {
  render () {
    const { theme: { mode }, zoomIn, zoomOut, ...props } = this.props
    function onKeyDown (e) {
      switch (e.which) {
        case PLUS: {
          zoomIn()
          return true
        }
        case MINUS: {
          zoomOut()
          return true
        }
        default: {
          return true
        }
      }
    }

    return (
      <Box as='aside' {...props} onKeyDown={onKeyDown}>
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

ImageToolbar.defaultProps = {
  zoomIn: () => true,
  zoomOut: () => true
}
ImageToolbar.propTypes = {
  theme: shape({
    mode: string
  }),
  zoomIn: func,
  zoomOut: func
}

export default ImageToolbar
