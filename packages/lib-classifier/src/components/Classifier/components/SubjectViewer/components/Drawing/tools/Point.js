import PropTypes from 'prop-types'
import React from 'react'

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

const Point = ({ active, mark, scale }) => {
  // TODOs:
  // - add and update per size prop
  // - add and update per color
  // - create and move pointerEvent to root tool?

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

  return (
    <g key={mark.id} transform={`translate(${mark.x}, ${mark.y})`} style={{ color: 'rgb(0, 255, 0)', pointerEvents: 'none' }}>
      <g fill='transparent' stroke='currentColor' strokeWidth='2.5' tabIndex='-1'>
        <line x1='0' y1={-1 * crosshairSpace * selectedRadius} x2='0' y2={-1 * selectedRadius} strokeWidth={crosshairWidth} />
        <line x1={-1 * crosshairSpace * selectedRadius} y1='0' x2={-1 * selectedRadius} y2='0' strokeWidth={crosshairWidth} />
        <line x1='0' y1={crosshairSpace * selectedRadius} x2='0' y2={selectedRadius} strokeWidth={crosshairWidth} />
        <line x1={crosshairSpace * selectedRadius} y1='0' x2={selectedRadius} y2='0' strokeWidth={crosshairWidth} />
        <circle r={radius} />
      </g>
    </g>
  )
}

Point.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }).isRequired,
  scale: PropTypes.shape({
    horizontal: PropTypes.number,
    vertical: PropTypes.number
  })
}

Point.defaultProps = {
  active: false,
  scale: {
    horizontal: 1,
    vertical: 1
  }
}

export default Point
