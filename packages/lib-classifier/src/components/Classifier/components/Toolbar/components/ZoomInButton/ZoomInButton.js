import React from 'react'
import zoomInIcon from './zoomInIcon'
import Button from '../Button'

function ZoomInButton () {
  return (
    <Button aria-label='Zoom in'>
      {zoomInIcon}
    </Button>
  )
}

export default ZoomInButton
