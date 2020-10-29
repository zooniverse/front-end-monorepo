import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { DragHandle } from '@plugins/drawingTools/components'

const HANDLE_RADIUS = 5
const GRAB_STROKE_WIDTH = 6

function storeMapper(stores) {
  return stores.classifierStore.workflows.active?.usesTranscriptionTask || false
}

function TranscriptionLine (props) {
  let transcriptionTaskColors = {}
  const stores = useContext(MobXProviderContext)
  const theme = useContext(ThemeContext)
  const [allowFinish, setAllowFinish] = useState(false)
  const usesTranscriptionTask = storeMapper(stores)
  const { active, color, mark, onFinish, scale, state } = props
  if (theme) {
    transcriptionTaskColors = {
      active: theme.global.colors.drawingTools.green,
      default: theme.global.colors.drawingTools.blue,
      transcribed: theme.global.colors.drawingTools.purple,
      complete: theme.global.colors['light-5']
    }
  }

  let lineState = state || 'default'
  if (active) {
    lineState = 'active'
  }
  const colorToRender = (usesTranscriptionTask) ? transcriptionTaskColors[lineState] : color
  const { x1, y1, x2, y2, finished } = mark
  const handleRadius = HANDLE_RADIUS / scale

  function onHandleDrag (coords) {
    mark.setCoordinates(coords)
  }

  function handlePointerDown (event) {
    event.stopPropagation()
    event.preventDefault()
    setAllowFinish(true)
  }

  function handleFinishClick (event) {
    if (allowFinish) {
      mark.finish()
      onFinish(event)
    }
  }

  let offsetX = 0
  let offsetY = 0
  if (mark.length) {
    const deltaX = x2 - x1
    const deltaY = y2 - y1
    offsetX = deltaX * (handleRadius/mark.length)
    offsetY = deltaY * (handleRadius/mark.length)
  }

  return (
    <g
      color={colorToRender}
      fill={colorToRender}
      stroke={colorToRender}
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
}

TranscriptionLine.propTypes = {
  active: PropTypes.bool,
  color: PropTypes.string,
  mark: PropTypes.object.isRequired,
  onFinish: PropTypes.func,
  scale: PropTypes.number,
  state: PropTypes.string
}

TranscriptionLine.defaultProps = {
  active: false,
  color: '',
  onFinish: () => true,
  scale: 1,
  state: ''
}

export default TranscriptionLine
