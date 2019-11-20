import React from 'react'
import { observer } from 'mobx-react'
import DrawingToolRoot from '@plugins/tasks/DrawingTask/components/tools/DrawingToolRoot'
import DeleteButton from '@plugins/tasks/DrawingTask/components/tools/DeleteButton'

function DrawingMarks ({ activeMark, onDelete, onPointerDown, onPointerUp, svg, tool }) {
  const marksArray = Array.from(tool.marks.values())
  function deleteMark (mark) {
    tool.deleteMark(mark)
    onDelete(mark)
  }

  return marksArray.map(mark => {

    const MarkingComponent = mark.toolComponent

    return (
      <DrawingToolRoot
        key={mark.id}
        isActive={mark === activeMark}
        coords={mark.coords}
        dragStart={onPointerDown}
        dragMove={(event, difference) => mark.move(difference)}
        dragEnd={onPointerUp}
        mark={mark}
        onDelete={() => deleteMark(mark)}
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
            onDelete={mark => deleteMark(mark)}
          />
        </MarkingComponent>
      </DrawingToolRoot>
    )
  })
}

export default DrawingMarks
