import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GRAB_STROKE_WIDTH = 6

function Rectangle ({ active, children, mark, scale }) {
  const { x_center, y_center, width, height } = mark

  function onHandleDrag (coords) {
    console.log('+++ coords: ', coords)
    
    mark.setCoordinates(coords)
  }
  
  const x_left = x_center - width / 2
  const x_right = x_center + width / 2
  const y_top = y_center - height / 2
  const y_bottom = y_center + height / 2
  
  return (
    <g>
      <rect x={x_left} y={y_top} width={width} height={height} />
      <rect x={x_left} y={y_top} width={width} height={height} strokeWidth={GRAB_STROKE_WIDTH / scale} strokeOpacity='0' />
      {active &&
        <DragHandle
          scale={scale}
          x={x_left}
          y={y_top}
          dragMove={(e, d) => 
            onHandleDrag({
              x_left: x_left + d.x,
              x_right: x_right,
              y_top: y_top + d.y,
              y_bottom: y_bottom,
            })
          }
        />}
      {active &&
        <DragHandle
          scale={scale}
          x={x_right}
          y={y_bottom}
          dragMove={(e, d) =>
            onHandleDrag({
              x_left: x_left,
              x_right: x_right + d.x,
              y_top: y_top,
              y_bottom: y_bottom + d.y,
            })
          }
        />}
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


