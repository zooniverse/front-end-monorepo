import cuid from 'cuid'
import { observer } from 'mobx-react'
import { func } from 'prop-types'
import React, { useState } from 'react'
import DrawingMarks from './components/DrawingMarks'

function InteractionLayer ({ activeDrawingTask, svg }) {
  const [ activeMark, setActiveMark ] = useState(null)

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

  function createMark (event) {
    const activeTool = activeDrawingTask.activeTool
    const activeMark = activeTool.createMark({
      id: cuid(),
      toolIndex: activeDrawingTask.activeToolIndex
    })
    activeMark.initialPosition(convertEvent(event))
    setActiveMark(activeMark)
  }

  function onPointerDown ({ x, y }) {
    activeMark && activeMark.initialPosition({ x, y })
  }

  function onPointerMove (event) {
    activeMark && activeMark.initialDrag(convertEvent(event))
  }

  function onPointerUp () {
    setActiveMark(null)
  }

  return (
    <g
      onPointerDown={createMark}
      onPointerMove={onPointerMove}
    >
      <rect
        id='InteractionLayer'
        width='100%'
        height='100%'
        fill='transparent'
      />
      {activeDrawingTask &&
        activeDrawingTask.tools.map( tool => {
          const ObservedDrawingMarks = observer(DrawingMarks)
          return (
            <ObservedDrawingMarks
              key={`${tool.type}-${tool.toolIndex}`}
              activeMark={activeMark}
              onDelete={() => setActiveMark(null)}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
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
