import React from 'react'
import { observer } from 'mobx-react'
import DrawingToolRoot from '@plugins/tasks/DrawingTask/components/tools/DrawingToolRoot'
import DeleteButton from '@plugins/tasks/DrawingTask/components/tools/DeleteButton'

function DrawingMarks ({ activeMark, onDelete, onDeselectMark, onPointerDown, onPointerUp, onSelectMark, svg, tool }) {
  const marksArray = Array.from(tool.marks.values())

  function deleteMark (mark) {
    tool.deleteMark(mark)
    onDelete(mark)
  }

  return marksArray.map(mark => {

    const MarkingComponent = mark.toolComponent
    const isActive = mark === activeMark

    function onMarkMove (event, difference ) {
      mark.move(difference)
    }

    return (
      <DrawingToolRoot
        key={mark.id}
        isActive={isActive}
        coords={mark.coords}
        dragStart={() => onSelectMark(mark)}
        dragMove={onMarkMove}
        dragEnd={() => onDeselectMark(mark)}
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
          {isActive && <DeleteButton
            mark={mark}
            svg={svg}
            tool={tool}
            {...mark.deleteButtonPosition}
            onDelete={mark => deleteMark(mark)}
          />}
        </MarkingComponent>
      </DrawingToolRoot>
    )
  })
}

DrawingMarks.defaultProps = {
  onDeselectMark: (mark) => true,
  onSelectMark: (mark) => true
}

export default DrawingMarks
