import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1

function Circle({ active, mark, onFinish, scale }) {
  console.log('mark: ', mark, mark.radius)
  const { x_center, y_center, radius } = mark
  const guideWidth = GUIDE_WIDTH / scale

  function onHandleDrag(coords) {
    mark.setCoordinates(coords)
  }

  const handleX = radius
  const handleY = 0

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <circle r={radius} />
      {active && (
        <g>
          <line
            x1={0}
            y1={0}
            x2={handleX}
            y2={handleY}
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
          />
          <DragHandle
            scale={scale}
            x={handleX}
            y={handleY}
            dragMove={(e, d) =>
              onHandleDrag({
                x: x_center + d.x,
                y: y_center + d.y
              })
            }
          />
        </g>
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
