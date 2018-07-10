import React from 'react'
import resetIcon from './resetIcon'
import Button from '../Button'

function ResetButton () {
  return (
    <Button aria-label='Reset'>
      {resetIcon}
    </Button>
  )
}

export default ResetButton
