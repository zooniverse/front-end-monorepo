import PropTypes from 'prop-types'
import React from 'react'
import DrawingToolRoot from './Root'

// TODO add and update per tool size prop

const RADIUS = {
  large: 10,
  small: 2
}
const SELECTED_RADIUS = {
  large: 20,
  small: 10
}
const CROSSHAIR_SPACE = 0.2
const CROSSHAIR_WIDTH = 1

const Point = ({ active, coordinates, finishDrawing, scale, tool }) => {
  const size = 'large'
  const averageScale = (scale.horizontal + scale.vertical) / 2
  const crosshairSpace = CROSSHAIR_SPACE / averageScale
  const crosshairWidth = CROSSHAIR_WIDTH / averageScale
  const selectedRadius = SELECTED_RADIUS[size] / averageScale

  let radius
  if (active) {
    radius = SELECTED_RADIUS[size] / averageScale
  } else {
    radius = RADIUS[size] / averageScale
  }

  if (!coordinates) return null
  if (active && coordinates.type === 'pointerup') {
    finishDrawing(coordinates)
  }

  return (
    <DrawingToolRoot active tool={tool}>
      <g transform={`translate(${coordinates.x}, ${coordinates.y})`}>
        <line x1='0' y1={-1 * crosshairSpace * selectedRadius} x2='0' y2={-1 * selectedRadius} strokeWidth={crosshairWidth} />
        <line x1={-1 * crosshairSpace * selectedRadius} y1='0' x2={-1 * selectedRadius} y2='0' strokeWidth={crosshairWidth} />
        <line x1='0' y1={crosshairSpace * selectedRadius} x2='0' y2={selectedRadius} strokeWidth={crosshairWidth} />
        <line x1={crosshairSpace * selectedRadius} y1='0' x2={selectedRadius} y2='0' strokeWidth={crosshairWidth} />
        <circle r={radius} />
      </g>
    </DrawingToolRoot>
  )
}

Point.propTypes = {
  active: PropTypes.bool,
  finishDrawing: PropTypes.func,
  scale: PropTypes.shape({
    horizontal: PropTypes.number,
    vertical: PropTypes.number
  }),
  tool: PropTypes.object
}

Point.defaultProps = {
  active: false,
  scale: {
    horizontal: 1,
    vertical: 1
  }
}

export default Point
