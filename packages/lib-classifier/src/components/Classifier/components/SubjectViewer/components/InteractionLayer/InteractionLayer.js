import { func } from 'prop-types'
import React from 'react'

function InteractionLayer ({ onMouseMove, onMouseDown, onMouseUp }) {
  return (
    <rect
      id='InteractionLayer'
      width='100%'
      height='100%'
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      fill='transparent'
    />
  )
}

InteractionLayer.propTypes = {
  onMouseMove: func.isRequired,
  onMouseDown: func.isRequired,
  onMouseUp: func.isRequired
}

export default InteractionLayer
