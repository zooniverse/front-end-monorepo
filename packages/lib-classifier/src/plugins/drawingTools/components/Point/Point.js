import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import useScale from '@plugins/drawingTools/hooks/useScale'

// TODO update per tool size prop

const RADIUS = {
  large: 10,
  small: 2
}
const SELECTED_RADIUS = {
  large: 20,
  small: 10
}
const CROSSHAIR_SPACE = 0.2
const CROSSHAIR_WIDTH = 1

const DEFAULT_MARK = {
  tool: {
    size: 'large'
  }
}

function Point({ active = false, mark = {DEFAULT_MARK}, onFinish }) {
  const scale = useScale()
  const { size } = mark.tool
  const crosshairSpace = CROSSHAIR_SPACE
  const crosshairWidth = CROSSHAIR_WIDTH
  const selectedRadius = SELECTED_RADIUS[size]
  const radius = RADIUS[size]

  return (
    <g transform={`scale(${1 / scale})`} onPointerUp={active ? onFinish : undefined}>
      <line
        x1='0'
        y1={-1 * crosshairSpace * selectedRadius}
        x2='0'
        y2={-1 * selectedRadius}
        strokeWidth={crosshairWidth}
        vectorEffect={'non-scaling-stroke'}
      />
      <line
        x1={-1 * crosshairSpace * selectedRadius}
        y1='0'
        x2={-1 * selectedRadius}
        y2='0'
        strokeWidth={crosshairWidth}
        vectorEffect={'non-scaling-stroke'}
      />
      <line
        x1='0'
        y1={crosshairSpace * selectedRadius}
        x2='0'
        y2={selectedRadius}
        strokeWidth={crosshairWidth}
        vectorEffect={'non-scaling-stroke'}
      />
      <line
        x1={crosshairSpace * selectedRadius}
        y1='0'
        x2={selectedRadius}
        y2='0'
        strokeWidth={crosshairWidth}
        vectorEffect={'non-scaling-stroke'}
      />
      <circle r={active ? selectedRadius : radius} vectorEffect={'non-scaling-stroke'} />
    </g>
  )
}

Point.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object,
}

export default observer(Point)
