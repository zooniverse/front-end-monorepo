import React from 'react'
import rotateIcon from './rotateIcon'
import Button from '../Button'

function RotateButton () {
  return (
    <Button adjustments={{ y: '2' }} aria-label='Rotate'>
      {rotateIcon}
    </Button>
  )
}

export default RotateButton
