import PropTypes from 'prop-types'
import React from 'react'
import DrawingToolRoot from './DrawingToolRoot'

const Line = ({ active, coordinates, finishDrawing, tool }) => {
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
