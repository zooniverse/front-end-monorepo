import PropTypes from 'prop-types'
import React from 'react'
import DrawingToolRoot from './Root'

const Line = ({ active, finishMark, tool }) => {
  // RANDOMLY SET COORDINATES UNTIL COORDINATE STREAM IMPLEMENTATION
  const coordinates = { x1: (Math.floor(Math.random() * 500)), y1: (Math.floor(Math.random() * 500)), x2: (Math.floor(Math.random() * 500)), y2: (Math.floor(Math.random() * 500)) }

  if (!coordinates) return null
  if (active && coordinates.type === 'pointerup') {
    finishDrawing(coordinates)
  }

  return (
    <DrawingToolRoot active tool={tool}>
      <line {...coordinates} />
    </DrawingToolRoot>
  )
}

Line.propTypes = {
  active: PropTypes.bool,
  finishDrawing: PropTypes.func,
  tool: PropTypes.object
}

Line.defaultProps = {
  active: false
}

export default Line
