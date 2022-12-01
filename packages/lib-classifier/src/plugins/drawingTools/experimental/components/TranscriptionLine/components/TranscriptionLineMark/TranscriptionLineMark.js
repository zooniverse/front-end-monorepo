import PropTypes from 'prop-types'
import { forwardRef } from 'react';
import { observer } from 'mobx-react'
import { DragHandle } from '@plugins/drawingTools/components'
import { HANDLE_RADIUS, GRAB_STROKE_WIDTH } from '../../helpers/constants'

// Forward ref incase it is being rendered with the Tooltip
const TranscriptionLineMark = forwardRef((props, ref) => {
  const {
    active,
    color,
    handleFinishClick,
    handlePointerDown,
    handleRadius,
    mark,
    onHandleDrag,
    scale
  }  = props

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
    offsetX = deltaX * (handleRadius / mark.length)
    offsetY = deltaY * (handleRadius / mark.length)
  }
  return (
    <g
      color={color}
      fill={color}
      ref={ref}
      stroke={color}
      strokeWidth={2}
    >
      <line x1={x1 + offsetX} y1={y1 + offsetY} x2={x2} y2={y2} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={GRAB_STROKE_WIDTH / scale} strokeOpacity='0' />

      {active ?
        <DragHandle
          fill='transparent'
          radius={HANDLE_RADIUS}
          scale={scale}
          x={x1}
          y={y1}
          dragMove={(e, d) => onHandleDrag({ x1: x1 + d.x, y1: y1 + d.y, x2, y2 })}
        /> :
        <circle
          cx={x1}
          cy={y1}
          fill='transparent'
          r={handleRadius}
          stroke='currentColor'
        />
      }
      {active ?
        <DragHandle
          radius={HANDLE_RADIUS}
          scale={scale}
          x={x2}
          y={y2}
          dragMove={(e, d) => onHandleDrag({ x1, y1, x2: x2 + d.x, y2: y2 + d.y })}
        /> :
        <circle
          cx={x2}
          cy={y2}
          fill='currentColor'
          r={handleRadius}
          stroke='currentColor'
        />
      }

      {active && !finished &&
        <g>
          <circle
            r={handleRadius}
            cx={x1}
            cy={y1}
            fill="transparent"
            onPointerDown={handlePointerDown}
            onPointerUp={handleFinishClick}
          />
          <circle
            r={handleRadius}
            cx={x2}
            cy={y2}
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