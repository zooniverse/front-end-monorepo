import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
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
}) {
  const { height, width, x_center, y_center } = mark
  const guideWidth = GUIDE_WIDTH

  // draw in local coordinates
  const x_left = -width / 2
  const x_right = width / 2
  const y_top = -height / 2
  const y_bottom = height / 2
  const xRotationHandle = width / 2 + BUFFER

  function onHandleDrag(params) {
    // params contain deltas, so don't need to transform
    mark.resizeByCorner(params)
  }

  function onRotateDrag(e) {
    const angle = mark.getAngle(x_center, y_center, e.x, e.y)
    // transform back into global coordinates
    mark.setCoordinates({
      x_left: x_center + x_left, 
      x_right: x_center + x_right, 
      y_top: y_center + y_top, 
      y_bottom: y_center + y_bottom, 
      angle 
    })
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <rect x={x_left} y={y_top} width={width} height={height} vectorEffect={'non-scaling-stroke'} />
      <rect
        x={x_left}
        y={y_top}
        width={width}
        height={height}
        strokeWidth={GRAB_STROKE_WIDTH}
        strokeOpacity='0'
        vectorEffect={'non-scaling-stroke'}
      />
      {/* Rotate Handle */}
      {active && (
        <g>
          <line
            x1={0}
            y1={0}
            x2={xRotationHandle}
            y2={0}
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
            vectorEffect={'non-scaling-stroke'}
          />
          <RotateHandle
            dragMove={onRotateDrag}
            x={xRotationHandle}
            y={0}
          />
        </g>
      )}

      {/* Original Top Left corner */}
      {active && (
        <DragHandle
          x={x_left}
          y={y_top}
          dragMove={(e, d) =>
            onHandleDrag({
              dx: d.x,
              dy: d.y,
              corner: 'top left'
            })
          }
        />
      )}

      {/* Original Top Right corner */}
      {active && (
        <DragHandle
          x={x_right}
          y={y_top}
          dragMove={(e, d) =>
            onHandleDrag({
              dx: d.x,
              dy: d.y,
              corner: 'top right'
            })
          }
        />
      )}

      {/* Original Bottom Right corner */}
      {active && (
        <DragHandle
          x={x_right}
          y={y_bottom}
          dragMove={(e, d) =>
            onHandleDrag({
              dx: d.x,
              dy: d.y,
              corner: 'bottom right'
            })
          }
        />
      )}

      {/* Original Bottom Left corner */}
      {active && (
        <DragHandle
          x={x_left}
          y={y_bottom}
          dragMove={(e, d) =>
            onHandleDrag({
              dx: d.x,
              dy: d.y,
              corner: 'bottom left'
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
}

export default observer(RotateRectangle)
