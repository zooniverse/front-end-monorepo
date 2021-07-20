import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import RotateHandle from '../RotateHandle'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1
const GRAB_STROKE_WIDTH = 6
const BUFFER = 32

function RotateRectangle({
  active = false,
  mark,
  onFinish = () => true,
  scale = 1
}) {
  const { angle, height, width, x_center, y_center } = mark
  const guideWidth = GUIDE_WIDTH / scale

  const x_left = x_center - width / 2
  const x_right = x_center + width / 2
  const y_top = y_center - height / 2
  const y_bottom = y_center + height / 2
  const xRotationHandle = x_center + width / 2 + BUFFER

  function onHandleDrag(coords) {
    mark.setCoordinates(coords)
  }

  function onRotateDrag(e) {
    const angle = mark.getAngle(x_center, y_center, e.x, e.y)
    mark.setCoordinates({ x_left, x_right, y_top, y_bottom, angle })
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
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
          <RotateHandle
            dragMove={onRotateDrag}
            scale={scale}
            x={xRotationHandle}
            y={y_center}
          />
        </g>
      )}

      {/* Original Top Left corner */}
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
              y_bottom: y_bottom,
              angle: angle
            })
          }
        />
      )}

      {/* Original Top Right corner */}
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
              y_bottom: y_bottom,
              angle: angle
            })
          }
        />
      )}

      {/* Original Bottom Right corner */}
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
              y_bottom: y_bottom + d.y,
              angle: angle
            })
          }
        />
      )}

      {/* Original Bottom Left corner */}
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
              y_bottom: y_bottom + d.y,
              angle: angle
            })
          }
        />
      )}
    </g>
  )
}

RotateRectangle.propTypes = {
  /**
    Modal active state.
  */
  active: PropTypes.bool,
  /**
    RotateRectangle data: { angle, height, width, x_center, y_center }
  */
  mark: PropTypes.shape({
    angle: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    x_center: PropTypes.number,
    y_center: PropTypes.number
  }).isRequired,

  /**
    Callback to reset the drawing canvas when creation of the rectangle is finished.
  */
  onFinish: PropTypes.func,
  /**
    Image scale factor. Used to keep line widths and sizes constant at all image scales.
  */
  scale: PropTypes.number
}

export default observer(RotateRectangle)
