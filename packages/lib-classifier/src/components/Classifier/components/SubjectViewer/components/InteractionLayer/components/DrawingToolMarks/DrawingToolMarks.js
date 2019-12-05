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
    const markRef = React.createRef()

    function isInBounds (markComponent) {
      const object = markComponent.getBounds()
      const bounds = svg.getBoundingClientRect()
      const notBeyondLeft = (object.left + object.width) > bounds.left
      const notBeyondRight = object.left < (bounds.left + bounds.width)
      const notBeyondTop = (object.top + object.height) > bounds.top
      const notBeyondBottom = object.top < (bounds.top + bounds.height)
      return notBeyondLeft && notBeyondRight && notBeyondTop && notBeyondBottom
    }

    function deleteMark () {
      tool.deleteMark(mark)
      onDelete(mark)
    }

    function moveMark (event, difference) {
      mark.move(difference)
    }

    function deselectMark () {
      onDeselectMark(mark)
      if (!isInBounds(markRef.current)) {
        deleteMark()
      }
    }

    function selectMark () {
      onSelectMark(mark)
    }

    return (
      <DrawingToolRoot
        ref={markRef}
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
