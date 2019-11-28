import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import DrawingToolRoot from '@plugins/tasks/DrawingTask/components/tools/DrawingToolRoot'
import DeleteButton from '@plugins/tasks/DrawingTask/components/tools/DeleteButton'

function DrawingMarks ({ activeMarkId, onDelete, onDeselectMark, onSelectMark, svg, tool }) {
  const marksArray = Array.from(tool.marks.values())

  return marksArray.map((mark, index) => {

    const MarkingComponent = observer(mark.toolComponent)
    const ObservedDeleteButton = observer(DeleteButton)
    const isActive = mark.id === activeMarkId

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
        label={`Mark ${index}`}
        mark={mark}
        onDelete={deleteMark}
        onDeselect={onDeselectMark}
        onSelect={onSelectMark}
        svg={svg}
        tool={tool}
      >
        <MarkingComponent
          active={isActive}
          mark={mark}
          svg={svg}
          tool={tool}
        />
        {isActive && <ObservedDeleteButton
          label={`Delete ${tool.type}`}
          mark={mark}
          svg={svg}
          onDelete={deleteMark}
        />}
      </DrawingToolRoot>
    )
  })
}

DrawingMarks.propTypes = {
  activeMarkId: PropTypes.string,
  onDelete: PropTypes.func,
  onDeselectMark: PropTypes.func,
  onSelectMark: PropTypes.func,
  svg: PropTypes.instanceOf(Element).isRequired,
  tool: PropTypes.object.isRequired
}

DrawingMarks.defaultProps = {
  activeMarkId: '',
  onDelete: () => true,
  onDeselectMark: (mark) => true,
  onSelectMark: (mark) => true
}

export default DrawingMarks
