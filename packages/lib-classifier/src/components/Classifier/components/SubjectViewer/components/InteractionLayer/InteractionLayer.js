import { func } from 'prop-types'
import React from 'react'

function InteractionLayer ({ onPointerDown, onPointerMove, onPointerUp }) {
  return (
    <rect
      id='InteractionLayer'
      width='100%'
      height='100%'
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      fill='transparent'
    />
  )
}

InteractionLayer.propTypes = {
  onPointerDown: func.isRequired,
  onPointerMove: func.isRequired,
  onPointerUp: func.isRequired
}

export default InteractionLayer
