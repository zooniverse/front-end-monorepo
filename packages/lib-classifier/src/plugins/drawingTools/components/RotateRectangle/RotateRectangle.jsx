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
  const { angle, height, width, x_center, y_center } = mark
  const guideWidth = GUIDE_WIDTH

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

  function rotateXY({ x, y }, angleInDegrees) {
    const theta = angleInDegrees * (Math.PI / 180)
    const xTheta = x * Math.cos(theta) + y * Math.sin(theta)
    const yTheta = -(x * Math.sin(theta)) + y * Math.cos(theta)
    return { x: xTheta, y: yTheta }
  }

  // Resizing behaviour:
  // Given a rectangle with corners ABCD and origin/centre O...
  //   A-------B
  //   |   O   |
  //   D-------C
  // ...when we resize the rectangle by dragging one corner, we want that resize
  // action to be anchored to the OPPOSITE corner. e.g. if C goes ↘️, A stays
  // static, B goes ➡️, D goes ⬇️, and O goes ↘️.
  // To do this in our code, we need to define which edges (AB, BC, CD, DA) stay
  // static, and which can move... which also accounts for the angle.

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <g style={{
        stroke: 'none',
        fontSize: '0.75em',
        fill: '#00ffff'
      }}>
        <text x={x_center} y={y_center}>
          {x_center?.toFixed(0)}, {y_center?.toFixed(0)}
        </text>
        <text x={x_center} y={y_center + 16}>
          {width?.toFixed(0)} x {height?.toFixed(0)}
        </text>
        <text x={x_center} y={y_center + 32}>
          {angle?.toFixed(0)}º
        </text>
      </g>

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
            x1={x_center}
            y1={y_center}
            x2={xRotationHandle}
            y2={y_center}
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
            vectorEffect={'non-scaling-stroke'}
          />
          <RotateHandle
            dragMove={onRotateDrag}
            x={xRotationHandle}
            y={y_center}
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
              x_left: x_left + rotateXY(d, angle).x,
              x_right: x_right - rotateXY(d, angle).x,
              y_top: y_top + rotateXY(d, angle).y,
              y_bottom: y_bottom - rotateXY(d, angle).y,
              angle: angle
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
              x_left: x_left - rotateXY(d, angle).x,
              x_right: x_right + rotateXY(d, angle).x,
              y_top: y_top + rotateXY(d, angle).y,
              y_bottom: y_bottom - rotateXY(d, angle).y,
              angle: angle
            })
          }
        />
      )}

      {/* Original Bottom Right corner */}
      {active && (
        <DragHandle
          fill='red'
          x={x_right}
          y={y_bottom}
          dragMove={(e, d) => {
            mark.resizeByCorner({
              dx: d.x,
              dy: d.y
            })
          }}
        />
      )}

      {/* Original Bottom Left corner */}
      {active && (
        <DragHandle
          x={x_left}
          y={y_bottom}
          dragMove={(e, d) =>
            onHandleDrag({
              x_left: x_left + rotateXY(d, angle).x,
              x_right: x_right - rotateXY(d, angle).x,
              y_top: y_top - rotateXY(d, angle).y,
              y_bottom: y_bottom + rotateXY(d, angle).y,
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
}

export default observer(RotateRectangle)
