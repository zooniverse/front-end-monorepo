import PropTypes from 'prop-types'
import { forwardRef } from 'react';
import { observer } from 'mobx-react'
import { DragHandle } from '@plugins/drawingTools/components'
import { HANDLE_RADIUS, GRAB_STROKE_WIDTH } from '../../helpers/constants'

import useScale from '@plugins/drawingTools/hooks/useScale'

const Circle = ({ fill, r, transform, ...props }) => (
  <g transform={transform}>
    <circle
      fill={fill}
      r={r}
      stroke='currentColor'
      vectorEffect={'non-scaling-stroke'}
      {...props}
    />
  </g>
)

// Forward ref incase it is being rendered with the Tooltip
const TranscriptionLineMark = forwardRef(({
  active,
  color,
  handleFinishClick,
  handlePointerDown,
  handleRadius = HANDLE_RADIUS,
  mark,
  onHandleDrag,
}, ref) => {
  const scale = useScale()
  const {
    finished,
    x1,
    x2,
    y1,
    y2 
  } = mark
  let offsetX = 0
  let offsetY = 0
  if (mark.length) {
    const deltaX = x2 - x1
    const deltaY = y2 - y1
    offsetX = deltaX * (handleRadius / mark.length) / scale
    offsetY = deltaY * (handleRadius / mark.length) / scale
  }

  function onDragStartPoint(e, d) {
    onHandleDrag({ x1: x1 + d.x, y1: y1 + d.y, x2, y2 })
  }

  function onDragEndPoint(e, d) {
    onHandleDrag({ x1, y1, x2: x2 + d.x, y2: y2 + d.y })
  }

  return (
    <g
      color={color}
      fill={color}
      ref={ref}
      stroke={color}
    >
      <line x1={x1 + offsetX} y1={y1 + offsetY} x2={x2} y2={y2} strokeWidth={2} vectorEffect={'non-scaling-stroke'} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={GRAB_STROKE_WIDTH} strokeOpacity='0' vectorEffect={'non-scaling-stroke'} />

      {active ?
        <DragHandle
          fill='transparent'
          radius={handleRadius}
          x={x1}
          y={y1}
          dragMove={onDragStartPoint}
        /> :
        <Circle
          fill='transparent'
          r={handleRadius}
          transform={`translate(${x1}, ${y1}) scale(${1 / scale})`}
        />
      }
      {active ?
        <DragHandle
          radius={handleRadius}
          x={x2}
          y={y2}
          dragMove={onDragEndPoint}
        /> :
        <Circle
          fill='currentColor'
          r={handleRadius}
          transform={`translate(${x2}, ${y2}) scale(${1 / scale})`}
        />
      }

      {active && !finished &&
        <g>
          <Circle
            className='startPoint'
            r={handleRadius}
            transform={`translate(${x1}, ${y1}) scale(${1 / scale})`}
            onPointerDown={handlePointerDown}
            onPointerUp={handleFinishClick}
          />
          <Circle
            className='endPoint'
            r={handleRadius}
            transform={`translate(${x2}, ${y2}) scale(${1 / scale})`}
            onPointerDown={handlePointerDown}
            onPointerUp={handleFinishClick}
          />
        </g>
      }
    </g>
  )
})

TranscriptionLineMark.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  handleFinishClick: PropTypes.func,
  handlePointerDown: PropTypes.func,
  handleRadius: PropTypes.func,
  mark: PropTypes.object.isRequired,
  onHandleDrag: PropTypes.func,
  scale: PropTypes.number
}

export default observer(TranscriptionLineMark)
export { TranscriptionLineMark }