import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { DeleteButton, Mark } from '@plugins/drawingTools/components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function DrawingToolMarks (props) {
  const {
    activeMark,
    marks,
    onDelete,
    onDeselectMark,
    onFinish,
    onMove,
    onSelectMark,
    scale
  } = props
  const { svg } = useContext(SVGContext)

  return marks.map((mark, index) => {
    const { tool } = mark
    const MarkingComponent = observer(mark.toolComponent)
    const ObservedDeleteButton = observer(DeleteButton)
    const isActive = mark.id === activeMark && activeMark.id
    const ref = React.createRef()
    
    function onFinishWithRef (event) {
      onFinish(event, ref.current)
    }
    
    function onSelectMarkWithRef (mark) {
      onSelectMark(mark, ref.current)
    }

    function isInBounds (markElement) {
      const object = markElement.getBoundingClientRect()
      const bounds = svg.getBoundingClientRect()
      const notBeyondLeft = (object.left + object.width) > bounds.left
      const notBeyondRight = object.left < (bounds.left + bounds.width)
      const notBeyondTop = (object.top + object.height) > bounds.top
      const notBeyondBottom = object.top < (bounds.top + bounds.height)
      return notBeyondLeft && notBeyondRight && notBeyondTop && notBeyondBottom
    }

    function deleteMark () {
      activeMark.setSubTaskVisibility(false)
      tool.deleteMark(mark)
      onDelete(mark)
    }

    function moveMark (event, difference) {
      onMove(mark, difference)
    }

    function deselectMark (event) {
      if (event?.currentTarget && !isInBounds(event.currentTarget)) {
        deleteMark()
      } else {
        onDeselectMark(mark)
      }
    }

    function endMoveMark (event) {
      if (event?.currentTarget && !isInBounds(event.currentTarget)) {
        deleteMark()
      } else {
        onFinishWithRef(event)
      }
    }

    function selectMark () {
      onSelectMarkWithRef(mark)
    }

    return (
      <Mark
        key={mark.id}
        isActive={isActive}
        coords={mark.coords}
        dragStart={selectMark}
        dragMove={moveMark}
        dragEnd={endMoveMark}
        label={`Mark ${index}`}
        mark={mark}
        onDelete={deleteMark}
        onDeselect={deselectMark}
        onFinish={onFinishWithRef}
        onSelect={onSelectMarkWithRef}
        ref={ref}
        scale={scale}
      >
        <MarkingComponent
          active={isActive}
          mark={mark}
          onFinish={onFinishWithRef}
          scale={scale}
        />
        {isActive && <ObservedDeleteButton
          label={`Delete ${tool.type}`}
          mark={mark}
          scale={scale}
          onDelete={deleteMark}
        />}
      </Mark>
    )
  })
}

DrawingToolMarks.propTypes = {
  activeMark: PropTypes.shape({
    id: PropTypes.string,
    setSubTaskVisibility: PropTypes.func
  }),
  marks: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onDeselectMark: PropTypes.func,
  onFinish: PropTypes.func,
  onMove: PropTypes.func,
  onSelectMark: PropTypes.func,
  scale: PropTypes.number
}

DrawingToolMarks.defaultProps = {
  activeMark: {
    id: '',
    setSubTaskVisibility: () => {}
  },
  onDelete: () => true,
  onDeselectMark: () => true,
  onFinish: () => true,
  onMove: () => true,
  onSelectMark: () => true,
  scale: 1
}

export default DrawingToolMarks
