import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import DragHandle from '../DragHandle'

const GRAB_STROKE_WIDTH = 6

function Rectangle({ active, mark, onFinish }) {
  const { x_center, y_center, width, height } = mark

  function onHandleDrag(coords) {
    mark.setCoordinates(coords)
  }

  const x_left = x_center - width / 2
  const x_right = x_center + width / 2
  const y_top = y_center - height / 2
  const y_bottom = y_center + height / 2

  const _onFinish =
    onFinish ||
    function () {
      return true
    }

  return (
    <g onPointerUp={active ? _onFinish : undefined}>
      <rect
        x={x_left}
        y={y_top}
        width={width}
        height={height}
        data-testid='rectangle-element'
        vectorEffect={'non-scaling-stroke'}
      />
      <rect
        x={x_left}
        y={y_top}
        width={width}
        height={height}
        strokeWidth={GRAB_STROKE_WIDTH}
        strokeOpacity='0'
        vectorEffect={'non-scaling-stroke'}
      />
      {active && (
        <DragHandle
          x={x_left}
          y={y_top}
          data-testid='rect-dragHandle1'
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
          x={x_right}
          y={y_bottom}
          data-testid='rect-dragHandle2'
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
          x={x_left}
          y={y_bottom}
          data-testid='rect-dragHandle3'
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
          x={x_right}
          y={y_top}
          data-testid='rect-dragHandle4'
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
    </g>
  )
}

Rectangle.propTypes = {
  active: PropTypes.bool
}

Rectangle.defaultProps = {
  active: false
}

export default observer(Rectangle)
