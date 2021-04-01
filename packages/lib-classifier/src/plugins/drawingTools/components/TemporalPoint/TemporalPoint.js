import PropTypes from 'prop-types'
import React from 'react'

// TODO update per tool size prop

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

function TemporalPoint({ active, children, mark, onFinish, scale }) {
  const { size } = mark.tool
  const crosshairSpace = CROSSHAIR_SPACE / scale
  const crosshairWidth = CROSSHAIR_WIDTH / scale
  const selectedRadius = SELECTED_RADIUS[size] / scale
  const radius = RADIUS[size] / scale

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <line
        x1='0'
        y1={-1 * crosshairSpace * selectedRadius}
        x2='0'
        y2={-1 * selectedRadius}
        strokeWidth={crosshairWidth}
      />
      <line
        x1={-1 * crosshairSpace * selectedRadius}
        y1='0'
        x2={-1 * selectedRadius}
        y2='0'
        strokeWidth={crosshairWidth}
      />
      <line
        x1='0'
        y1={crosshairSpace * selectedRadius}
        x2='0'
        y2={selectedRadius}
        strokeWidth={crosshairWidth}
      />
      <line
        x1={crosshairSpace * selectedRadius}
        y1='0'
        x2={selectedRadius}
        y2='0'
        strokeWidth={crosshairWidth}
      />
      <circle r={active ? selectedRadius : radius} />
      {children}
    </g>
  )
}

TemporalPoint.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object,
  scale: PropTypes.number
}

TemporalPoint.defaultProps = {
  active: false,
  mark: {
    tool: {
      size: 'large'
    }
  },
  scale: 1
}

export default TemporalPoint
