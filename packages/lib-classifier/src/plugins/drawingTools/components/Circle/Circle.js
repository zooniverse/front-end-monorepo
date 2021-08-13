import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1

function Circle({ active, mark, onFinish, scale }) {
  const { x_center, y_center, radius } = mark
  const guideWidth = GUIDE_WIDTH / scale

  // x, y coords for handle
  const handleX = radius
  const handleY = 0

  function onHandleDrag(e) {
    // e.x & e.y are new coords of handle
    const r = mark.getDistance(x_center, y_center, e.x, e.y)
    mark.setCoordinates({ x: x_center, y: y_center, r })
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      {/* cx and cy are set in Mark.js component: transform  */}
      <circle r={radius} data-testid='circle-element' />
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
            dragMove={onHandleDrag}
          />
        </g>
      )}
    </g>
  )
}

Circle.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object.isRequired,
  onFinish: PropTypes.func,
  scale: PropTypes.number
}

Circle.defaultProps = {
  active: false,
  onFinish: () => true,
  scale: 1
}

export default observer(Circle)
