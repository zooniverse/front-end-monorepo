import React from 'react'
import pointerIcon from './pointerIcon'
import Button from '../Button'

function AnnotateButton () {
  return (
    <Button adjustments={{ x: '1', y: '4' }} aria-label='Annotate'>
      {pointerIcon}
    </Button>
  )
}

export default AnnotateButton
