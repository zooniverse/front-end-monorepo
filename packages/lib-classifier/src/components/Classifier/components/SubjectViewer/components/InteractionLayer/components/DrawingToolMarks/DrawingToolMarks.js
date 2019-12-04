import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { DeleteButton, DrawingToolRoot } from '@plugins/drawingTools/components'

function DrawingToolMarks ({ activeMarkId, onDelete, onDeselectMark, onSelectMark, scale, svg, tool }) {
  const marksArray = Array.from(tool.marks.values())

  return marksArray.map((mark, index) => {
    const MarkingComponent = observer(mark.toolComponent)
    const ObservedDeleteButton = observer(DeleteButton)
    const isActive = mark.id === activeMarkId

    function deleteMark () {
      tool.deleteMark(mark)
      onDelete(mark)
    }

    function moveMark (event, difference) {
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
          scale={scale}
          svg={svg}
          tool={tool}
        />
        {isActive && <ObservedDeleteButton
          label={`Delete ${tool.type}`}
          mark={mark}
          scale={scale}
          svg={svg}
          onDelete={deleteMark}
        />}
      </DrawingToolRoot>
    )
  })
}

DrawingToolMarks.propTypes = {
  activeMarkId: PropTypes.string,
  onDelete: PropTypes.func,
  onDeselectMark: PropTypes.func,
  onSelectMark: PropTypes.func,
  scale: PropTypes.number,
  svg: PropTypes.instanceOf(Element).isRequired,
  tool: PropTypes.object.isRequired
}

DrawingToolMarks.defaultProps = {
  activeMarkId: '',
  onDelete: () => true,
  onDeselectMark: () => true,
  onSelectMark: () => true,
  scale: 1
}

export default DrawingToolMarks
