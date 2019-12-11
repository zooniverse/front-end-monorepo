import PropTypes from 'prop-types'
import React from 'react'
import DragHandle from '../DragHandle'

const FINISHER_RADIUS = 8
const GRAB_STROKE_WIDTH = 6

function TranscriptionLine ({ active, children, mark, onFinish, scale, svg, tool }) {
  const { x1, y1, x2, y2, closed } = mark
  const finisherRadius = FINISHER_RADIUS / scale

  function onHandleDrag (coords) {
    mark.setCoordinates(coords)
  }

  function handleFinishClick () {
    mark.close()
    onFinish()
  }

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />

      {active &&
        <DragHandle
          fill='transparent'
          radius={6}
          scale={scale}
          svg={svg}
          x={x1}
          y={y1}
          dragMove={(e, d) => onHandleDrag({ x1: x1 + d.x, y1: y1 + d.y, x2, y2 })}
        />}
      {active &&
        <DragHandle
          radius={6}
          scale={scale}
          svg={svg}
          x={x2}
          y={y2}
          dragMove={(e, d) => onHandleDrag({ x1, y1, x2: x2 + d.x, y2: y2 + d.y })}
        />}

      {active && !closed &&
        <g>
          <circle r={finisherRadius} cx={x1} cy={y1} stroke="transparent" onPointerDown={handleFinishClick} />
          <circle r={finisherRadius} cx={x2} cy={y2} onPointerDown={handleFinishClick} />
        </g>
      }
    </g>
  )
}

TranscriptionLine.propTypes = {
  active: PropTypes.bool,
  onFinish: PropTypes.func,
  tool: PropTypes.object
}

TranscriptionLine.defaultProps = {
  active: false,
  onFinish: () => true
}

export default TranscriptionLine
