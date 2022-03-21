import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1

function Circle({ active, mark, onFinish, scale }) {
  const { x_center, y_center, r } = mark
  const guideWidth = GUIDE_WIDTH / scale

  // x, y coords for handle
  const handleX = r
  const handleY = 0

  function onHandleDrag(e) {
    // e.x & e.y are new coords of handle
    const r = mark.getDistance(x_center, y_center, e.x, e.y)
    mark.setCoordinates({ x: x_center, y: y_center, r })
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      {/* x-translation and y-translation are set in Mark.js component: transform  */}
      <circle r={r} data-testid='circle-element' />
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
  /**
    Modal active state.
  */
  active: PropTypes.bool,
  /**
    Circle Attributes:
  */
  mark: PropTypes.shape({
    r: PropTypes.number,
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

Circle.defaultProps = {
  active: false,
  onFinish: () => true,
  scale: 1
}

export default observer(Circle)
