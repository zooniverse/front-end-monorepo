import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1
const GRAB_STROKE_WIDTH = 6
const BUFFER = 32

function RotateRectangle({ active, children, mark, onFinish, scale }) {
  const { x_center, y_center, width, height, angle } = mark
  const guideWidth = GUIDE_WIDTH / scale
  const x_left = x_center - width / 2
  const x_right = x_center + width / 2
  const y_top = y_center - height / 2
  const y_bottom = y_center + height / 2
  const xRotationHandle = x_center + width / 2 + BUFFER

  const _onFinish =
    onFinish ||
    function () {
      return true
    }

  function onHandleDrag(coords) {
    mark.setCoordinates(coords)
  }

  // function onRotateDrag() {}

  return (
    <g onPointerUp={active ? _onFinish : undefined}>
      <rect x={x_left} y={y_top} width={width} height={height} />
      <rect
        x={x_left}
        y={y_top}
        width={width}
        height={height}
        strokeWidth={GRAB_STROKE_WIDTH / scale}
        strokeOpacity='0'
      />
      {/* Rotate Handle */}
      {active && (
        <g>
          <line
            x1={x_center}
            y1={y_center}
            x2={xRotationHandle}
            y2={y_center}
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
          />
          <DragHandle scale={scale} x={xRotationHandle} y={y_center} />
        </g>
      )}
      {active && (
        <DragHandle
          scale={scale}
          x={x_left}
          y={y_top}
          dragMove={(e, d) =>
            onHandleDrag({
              x_left: x_left + d.x,
              x_right: x_right,
              y_top: y_top + d.y,
              y_bottom: y_bottom
            })
          }
        />
      )}
      {active && (
        <DragHandle
          scale={scale}
          x={x_right}
          y={y_bottom}
          dragMove={(e, d) =>
            onHandleDrag({
              x_left: x_left,
              x_right: x_right + d.x,
              y_top: y_top,
              y_bottom: y_bottom + d.y
            })
          }
        />
      )}
      {active && (
        <DragHandle
          scale={scale}
          x={x_left}
          y={y_bottom}
          dragMove={(e, d) =>
            onHandleDrag({
              x_left: x_left + d.x,
              x_right: x_right,
              y_top: y_top,
              y_bottom: y_bottom + d.y
            })
          }
        />
      )}
      {active && (
        <DragHandle
          scale={scale}
          x={x_right}
          y={y_top}
          dragMove={(e, d) =>
            onHandleDrag({
              x_left: x_left,
              x_right: x_right + d.x,
              y_top: y_top + d.y,
              y_bottom: y_bottom
            })
          }
        />
      )}
      {children}
    </g>
  )
}

RotateRectangle.propTypes = {
  active: PropTypes.bool
}

RotateRectangle.defaultProps = {
  active: false
}

export default RotateRectangle
