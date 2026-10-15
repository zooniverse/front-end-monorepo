import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import DragHandle from '../DragHandle'

import useSVGContext from '@plugins/drawingTools/hooks/useSVGContext'

const GUIDE_DASH = [4, 4]
const GUIDE_WIDTH = 1

const DEFAULT_HANDLER = () => false

function Ellipse({
  active = false,
  mark,
  onFinish = DEFAULT_HANDLER,
}) {
  const { rx, ry } = mark
  const { scale } = useSVGContext()
  const guideWidth = GUIDE_WIDTH

  function onXHandleDrag(e, d) {
    mark.resizeByAxis({ dx: d.x, dy: d.y, axis: 'major', scale })
  }

  function onYHandleDrag(e, d) {
    mark.resizeByAxis({ dx: d.x, dy: d.y, axis: 'minor', scale })
  }

  return (
    <g onPointerUp={active ? onFinish : undefined}>
      <ellipse rx={rx} ry={ry} vectorEffect={'non-scaling-stroke'} />

      {active && (
        <g>
          <line
            x1='0'
            y1='0'
            x2={rx}
            y2='0'
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
            vectorEffect={'non-scaling-stroke'}
          />
          <line
            x1='0'
            y1='0'
            x2='0'
            y2={-1 * ry}
            strokeWidth={guideWidth}
            strokeDasharray={GUIDE_DASH}
            vectorEffect={'non-scaling-stroke'}
          />
          <DragHandle dragMove={onXHandleDrag} x={rx} y={0} />
          <DragHandle dragMove={onYHandleDrag} x={0} y={-1 * ry} />
        </g>
      )}
    </g>
  )
}

Ellipse.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object.isRequired,
  onFinish: PropTypes.func,
}

export default observer(Ellipse)
