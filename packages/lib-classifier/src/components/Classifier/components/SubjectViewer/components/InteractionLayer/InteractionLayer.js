import { func } from 'prop-types'
import React from 'react'

function InteractionLayer ({ onPointerMove, onPointerDown, onPointerUp }) {
  return (
    <rect
      id='InteractionLayer'
      width='100%'
      height='100%'
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      fill='transparent'
    />
  )
}

InteractionLayer.propTypes = {
  onPointerMove: func.isRequired,
  onPointerDown: func.isRequired,
  onPointerUp: func.isRequired
}

export default InteractionLayer
