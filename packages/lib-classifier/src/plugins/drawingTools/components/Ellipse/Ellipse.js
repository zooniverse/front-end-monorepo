import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1

function Ellipse({ active, mark, onFinish, scale }) {
  const { x_center, y_center, rx, ry } = mark
  const guideWidth = GUIDE_WIDTH / scale

  function onXHandleDrag(e) {
    const r = mark.getDistance(x_center, y_center, e.x, e.y)
    const angle = mark.getAngle(x_center, y_center, e.x, e.y)
    mark.setCoordinates({ x: x_center, y: y_center, rx: r, ry, angle })
  }

  function onYHandleDrag(e) {
    const r = mark.getDistance(x_center, y_center, e.x, e.y)
    const angle = mark.getAngle(x_center, y_center, e.x, e.y) + 90
    mark.setCoordinates({ x: x_center, y: y_center, rx, ry: r, angle })
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <ellipse rx={rx} ry={ry} />

      {active && (
        <g>
          <line
            x1='0'
            y1='0'
            x2={rx}
            y2='0'
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
          />
          <line
            x1='0'
            y1='0'
            x2='0'
            y2={-1 * ry}
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
          />
          <DragHandle dragMove={onXHandleDrag} x={rx} y={0} scale={scale} />
          <DragHandle
            dragMove={onYHandleDrag}
            x={0}
            y={-1 * ry}
            scale={scale}
          />
        </g>
      )}
    </g>
  )
}

Ellipse.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object.isRequired,
  onFinish: PropTypes.func,
  scale: PropTypes.number
}

Ellipse.defaultProps = {
  active: false,
  onFinish: () => true,
  scale: 1
}

export default observer(Ellipse)
