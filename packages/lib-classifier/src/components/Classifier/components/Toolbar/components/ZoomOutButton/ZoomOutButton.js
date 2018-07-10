import React from 'react'
import zoomOutIcon from './zoomOutIcon'
import Button from '../Button'

function ZoomOutButton () {
  return (
    <Button aria-label='Zoom out'>
      {zoomOutIcon}
    </Button>
  )
}

export default ZoomOutButton
