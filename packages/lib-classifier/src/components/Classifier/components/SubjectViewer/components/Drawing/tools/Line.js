import PropTypes from 'prop-types'
import React from 'react'

import DrawingToolRoot from './Root'

const Line = ({ active, coordinates, finishDrawing, tool }) => {
  if (coordinates.length <= 1) return null

  const secondaryCoordinates = coordinates[(coordinates.length - 1)]
  const currentCoordinates = {
    x1: coordinates[0].x,
    y1: coordinates[0].y,
    x2: secondaryCoordinates.x,
    y2: secondaryCoordinates.y
  }

  if (active && secondaryCoordinates.type && secondaryCoordinates.type === 'pointerup') {
    finishDrawing(coordinates)
  }

  return (
    <DrawingToolRoot active tool={tool}>
      <line {...currentCoordinates} />
    </DrawingToolRoot>
  )
}

Line.propTypes = {
  active: PropTypes.bool,
  coordinates: PropTypes.array,
  finishDrawing: PropTypes.func,
  tool: PropTypes.object
}

export default Line
