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

function withKeyZoom (WrappedComponent) {
  return @inject(storeMapper)
  class extends React.Component {
    constructor () {
      super()
      this.onKeyDown = this.onKeyDown.bind(this)
    }

    onKeyDown (e) {
      const { zoomIn, zoomOut } = this.props
      switch (e.key) {
        case '+':
        case '=': {
          zoomIn()
          return true
        }
        case '-':
        case '_': {
          zoomOut()
          return true
        }
        default: {
          return true
        }
      }
    }

    render () {
      const { zoomIn, zoomOut, ...props } = this.props
      return <WrappedComponent onKeyDown={this.onKeyDown} {...props} />
    }
  }
}

@withTheme
@withKeyZoom
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
