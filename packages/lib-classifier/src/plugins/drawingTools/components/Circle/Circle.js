import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1

function Circle({ active, mark, onFinish, scale }) {
  console.log('mark: ', mark)
  const { x, y, r } = mark
  const guideWidth = GUIDE_WIDTH / scale

  function onHandleDrag(coords) {
    mark.setCoordinates(coords)
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <circle cx={x} cy={y} r={r} />
      {/* Why do we need two? */}
      {/* <circle
        cx={x}
        cy={y}
        r={r}
        strokeWidth={guideWidth}
        strokeDasharray={GUIDE_DASH}
      /> */}
      {active && (
        <DragHandle
          scale={scale}
          x={x}
          y={y}
          dragMove={(e, d) =>
            onHandleDrag({
              cx: cx + d.x,
              cy: cy + d.y,
              r: r + d.r
            })
          }
        />
      )}
    </g>
  )
}

Circle.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object.isRequired,
  scale: PropTypes.number
}

Circle.defaultProps = {
  active: false,
  scale: 1
}

export default observer(Circle)
