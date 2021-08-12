import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1

function Circle({ active, mark, onFinish, scale }) {
  console.log('mark: ', mark)
  const { x_center, y_center, radius } = mark
  const guideWidth = GUIDE_WIDTH / scale

  function onHandleDrag(coords) {
    mark.setCoordinates(coords)
  }

  // console.log('x_center: ', x_center)
  // console.log('y_center: ', y_center)
  console.log('radius: ', radius)

  const handleX = x_center + radius
  console.log('handleX: ', handleX)

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <circle cx={x_center} cy={y_center} r={radius} />
      {active && (
        <g>
          {/* <line
            x1={x_center}
            y1={y_center}
            x2={handleX}
            y2={y_center}
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
          /> */}
          <DragHandle
            scale={scale}
            x={handleX}
            y={y_center}
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
