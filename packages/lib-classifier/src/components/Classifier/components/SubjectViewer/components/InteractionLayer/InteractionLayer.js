import cuid from 'cuid'
import { func } from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import DrawingToolMarks from './components/DrawingToolMarks'

const StyledRect = styled('rect')`
  cursor: ${props => props.disabled ? 'not-allowed' : 'crosshair'};
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
`

function InteractionLayer ({ activeDrawingTask, svg }) {
  const [ activeMark, setActiveMark ] = useState(null)
  const [ creating, setCreating ] = useState(false)

  function convertEvent (event) {
    const type = event.type

    const svgEventOffset = getEventOffset(event.clientX, event.clientY)

    const svgCoordinateEvent = {
      pointerId: event.pointerId,
      type,
      x: svgEventOffset.x,
      y: svgEventOffset.y
    }

    return svgCoordinateEvent
  }

  function getEventOffset (x, y) {
    const svgEvent = svg.createSVGPoint()
    svgEvent.x = x
    svgEvent.y = y
    const svgEventOffset = svgEvent.matrixTransform(svg.getScreenCTM().inverse())
    return svgEventOffset
  }

  function onPointerDown (event) {
    const { activeTool } = activeDrawingTask
    const activeMark = activeTool.createMark({
      id: cuid(),
      toolIndex: activeDrawingTask.activeToolIndex
    })
    activeMark.initialPosition(convertEvent(event))
    setActiveMark(activeMark)
    setCreating(true)
  }

  function onPointerMove (event) {
    creating && activeMark.initialDrag(convertEvent(event))
  }

  function onPointerUp () {
    setCreating(false)
    if (activeMark && !activeMark.isValid) {
      const { activeTool } = activeDrawingTask
      activeTool.deleteMark(activeMark)
      setActiveMark(null)
    }
  }

  const { activeTool } = activeDrawingTask
  const { disabled } = activeTool
  return (
    <g
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <StyledRect
        id='InteractionLayer'
        disabled={disabled}
        width='100%'
        height='100%'
        fill='transparent'
        onPointerDown={onPointerDown}
      />
      {activeDrawingTask &&
        activeDrawingTask.tools.map(tool => {
          return (
            <DrawingToolMarks
              key={`${tool.type}-${tool.color}`}
              activeMarkId={activeMark && activeMark.id}
              onDelete={() => setActiveMark(null)}
              onSelectMark={mark => setActiveMark(mark)}
              svg={svg}
              tool={tool}
            />
          )
        })
      }
    </g>
  )
}

InteractionLayer.propTypes = {
}

export default InteractionLayer
export { StyledRect }
