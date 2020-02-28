import PropTypes from 'prop-types'
import React from 'react'
import { DragHandle } from '@plugins/drawingTools/components'

const FINISHER_RADIUS = 6
const GRAB_STROKE_WIDTH = 6
const COLOURS = {
  active: '#5cb85c',
  default: '#00ced1',
  transcribed: '#c33',
  complete: '#979797'
}

function TranscriptionLine ({ active, mark, onFinish, scale, state }) {
  state = active ? 'active' : state
  const colour = COLOURS[state]
  const { x1, y1, x2, y2, finished } = mark
  const finisherRadius = FINISHER_RADIUS / scale

  function onHandleDrag (coords) {
    mark.setCoordinates(coords)
  }

  function handleFinishClick (event) {
    mark.finish()
    onFinish(event)
  }

  let offsetX = 0
  let offsetY = 0
  if (mark.length) {
    const deltaX = x2 - x1
    const deltaY = y2 - y1
    offsetX = deltaX * (finisherRadius/mark.length)
    offsetY = deltaY * (finisherRadius/mark.length)
  }

  return (
    <g
      color={colour}
      fill={colour}
      stroke={colour}
      strokeWidth={1}
    >
      <line x1={x1 + offsetX} y1={y1 + offsetY} x2={x2} y2={y2} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={GRAB_STROKE_WIDTH / scale} strokeOpacity='0' />

      {active ?
        <DragHandle
          fill='transparent'
          radius={6}
          scale={scale}
          x={x1}
          y={y1}
          dragMove={(e, d) => onHandleDrag({ x1: x1 + d.x, y1: y1 + d.y, x2, y2 })}
        /> :
        <circle
          cx={x1}
          cy={y1}
          fill='transparent'
          r={finisherRadius}
          stroke='currentColor'
        />
      }
      {active ?
        <DragHandle
          radius={6}
          scale={scale}
          x={x2}
          y={y2}
          dragMove={(e, d) => onHandleDrag({ x1, y1, x2: x2 + d.x, y2: y2 + d.y })}
        /> :
        <circle
          cx={x2}
          cy={y2}
          fill='currentColor'
          r={finisherRadius}
          stroke='currentColor'
        />
      }

      {active && !finished &&
        <g>
          <circle r={finisherRadius} cx={x1} cy={y1} fill="transparent" onPointerDown={handleFinishClick} />
          <circle r={finisherRadius} cx={x2} cy={y2} onPointerDown={handleFinishClick} />
        </g>
      }
    </g>
  )
}

TranscriptionLine.propTypes = {
  active: PropTypes.bool,
  mark: PropTypes.object.isRequired,
  onFinish: PropTypes.func,
  scale: PropTypes.number,
  state: PropTypes.string
}

TranscriptionLine.defaultProps = {
  active: false,
  onFinish: () => true,
  scale: 1,
  state: 'default'
}

export default TranscriptionLine
