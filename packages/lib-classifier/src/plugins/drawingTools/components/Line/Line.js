import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import DragHandle from '../DragHandle'

const GRAB_STROKE_WIDTH = 6

function Line({ active = false, mark, onFinish }) {
  const { x1, y1, x2, y2 } = mark

  function onHandleDrag(coords) {
    mark.setCoordinates(coords)
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} vectorEffect={'non-scaling-stroke'} />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={GRAB_STROKE_WIDTH}
        strokeOpacity='0'
        vectorEffect={'non-scaling-stroke'}
      />
      {active && (
        <DragHandle
          x={x1}
          y={y1}
          dragMove={(e, d) =>
            onHandleDrag({ x1: x1 + d.x, y1: y1 + d.y, x2, y2 })
          }
        />
      )}
      {active && (
        <DragHandle
          x={x2}
          y={y2}
          dragMove={(e, d) =>
            onHandleDrag({ x1, y1, x2: x2 + d.x, y2: y2 + d.y })
          }
        />
      )}
    </g>
  )
}

Line.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object.isRequired,
}

export default observer(Line)
