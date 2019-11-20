import cuid from 'cuid'
import { observer } from 'mobx-react'
import { func } from 'prop-types'
import React, { useState } from 'react'
import DrawingToolRoot from '@plugins/tasks/DrawingTask/components/tools/DrawingToolRoot'
import DeleteButton from '@plugins/tasks/DrawingTask/components/tools/DeleteButton'

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

  function deleteMark (tool, mark) {
    // TODO: fade out the deleted mark then remove it.
    setActiveMark(null)
    tool.deleteMark(mark)
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
          const marksArray = Array.from(tool.marks.values())
          return marksArray.map(mark => {

            const MarkingComponent = observer(mark.toolComponent)

            return (
              <DrawingToolRoot
                key={mark.id}
                isActive={mark === activeMark}
                coords={mark.coords}
                dragStart={onPointerDown}
                dragMove={(event, difference) => mark.move(difference)}
                dragEnd={onPointerUp}
                mark={mark}
                onDelete={mark => deleteMark(tool, mark)}
                svg={svg}
                tool={tool}
              >
                <MarkingComponent
                  mark={mark}
                  svg={svg}
                  tool={tool}
                >
                  <DeleteButton
                    mark={mark}
                    svg={svg}
                    tool={tool}
                    {...mark.deleteButtonPosition}
                    onDelete={mark => deleteMark(tool, mark)}
                  />
                </MarkingComponent>
              </DrawingToolRoot>
            )
          })})
      }
    </g>
  )
}

InteractionLayer.propTypes = {
}

export default InteractionLayer
