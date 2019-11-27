import React from 'react'
import DrawingToolRoot from '@plugins/tasks/DrawingTask/components/tools/DrawingToolRoot'
import DeleteButton from '@plugins/tasks/DrawingTask/components/tools/DeleteButton'

function DrawingMarks ({ activeMark, onDelete, onDeselectMark, onSelectMark, svg, tool }) {
  const marksArray = Array.from(tool.marks.values())

  return marksArray.map(mark => {

    const MarkingComponent = mark.toolComponent
    const isActive = mark === activeMark

    function deleteMark () {
      tool.deleteMark(mark)
      onDelete(mark)
    }

    function moveMark (event, difference ) {
      mark.move(difference)
    }

    function deselectMark () {
      onDeselectMark(mark)
    }

    function selectMark () {
      onSelectMark(mark)
    }

    return (
      <DrawingToolRoot
        key={mark.id}
        isActive={isActive}
        coords={mark.coords}
        dragStart={selectMark}
        dragMove={moveMark}
        dragEnd={deselectMark}
        mark={mark}
        onDelete={deleteMark}
        onDeselect={onDeselectMark}
        onSelect={onSelectMark}
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
