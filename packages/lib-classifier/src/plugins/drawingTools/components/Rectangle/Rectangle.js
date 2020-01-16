import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GRAB_STROKE_WIDTH = 6

function Rectangle ({ active, children, mark, scale }) {
  const { x1, y1, x2, y2 } = mark

  function onHandleDrag (coords) {
    mark.setCoordinates(coords)
  }

  const x_center = (x1 + x2) / 2
  const y_center = (y1 + y2) / 2
  
  const x_left = Math.min(x1, x2)
  const x_right = Math.max(x1, x2)
  const y_top = Math.min(y1, y2)
  const y_bottom = Math.max(y1, y2)
  
  const width = Math.abs(x2 - x1)
  const height = Math.abs(y2 - y1)
  
  return (
    <g>
      <rect x={x_left} y={y_top} width={width} height={height} />
      <rect x={x_left} y={y_top} width={width} height={height} strokeWidth={GRAB_STROKE_WIDTH / scale} strokeOpacity='0' />
      {active &&
        <DragHandle scale={scale} x={x1} y={y1} dragMove={(e, d) => onHandleDrag({ x1: x1 + d.x, y1: y1 + d.y, x2, y2 })} />}
      {active &&
        <DragHandle scale={scale} x={x2} y={y2} dragMove={(e, d) => onHandleDrag({ x1, y1, x2: x2 + d.x, y2: y2 + d.y })} />}
      {children}
    </g>
  )
}

Rectangle.propTypes = {
  active: PropTypes.bool
}

Rectangle.defaultProps = {
  active: false
}

export default Rectangle


