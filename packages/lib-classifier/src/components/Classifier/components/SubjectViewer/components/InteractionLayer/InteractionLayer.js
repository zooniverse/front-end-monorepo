import cuid from 'cuid'
import { observer } from 'mobx-react'
import { func } from 'prop-types'
import React, { useState } from 'react'

function InteractionLayer ({ activeDrawingTask, svg }) {
  const [ activeMark, setActiveMark ] = useState(null)

  function convertEvent (event) {
    const type = event.type

    const clientX = event.clientX
    const clientY = event.clientY
    const svgEventOffset = getEventOffset(clientX, clientY)

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
    const activeTool = activeDrawingTask.activeTool
    const activeMark = activeTool.createMark({
      id: cuid(),
      toolIndex: activeDrawingTask.activeToolIndex
    })
    activeMark.setCoordinates(convertEvent(event))
    setActiveMark(activeMark)
  }

  function onPointerMove (event) {
    if (activeMark) {
      activeMark.setCoordinates(convertEvent(event))
    }
  }

  function onPointerUp (event) {
    if (activeMark) {
      activeMark.setCoordinates(convertEvent(event))
    }
    setActiveMark(null)
  }

  return (
    <g
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <rect
        id='InteractionLayer'
        width='100%'
        height='100%'
        fill='transparent'
      />
      {activeDrawingTask &&
        activeDrawingTask.tools.map( tool => {
          const marksArray = Array.from(tool.marks.values())
          return marksArray.map(mark => {

            const MarkingComponent = observer(mark.toolComponent)

            return (
              <MarkingComponent
                key={mark.id}
                active={mark === activeMark}
                mark={mark}
                tool={tool}
              />
            )
          })})
      }
    </g>
  )
}

InteractionLayer.propTypes = {
}

export default InteractionLayer
