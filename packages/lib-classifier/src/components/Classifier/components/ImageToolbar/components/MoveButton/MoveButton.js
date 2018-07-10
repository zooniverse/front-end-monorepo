import React from 'react'
import moveIcon from './moveIcon'
import Button from '../Button'

function MoveButton () {
  return (
    <Button size='46' aria-label='Move'>
      {moveIcon}
    </Button>
  )
}

export default MoveButton
