import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton, Mark } from '@plugins/drawingTools/components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

function DrawingToolMarks({
  activeMark = {
      id: '',
      setSubTaskVisibility: () => {}
    },
  marks = [],
  onDelete = () => true,
  onDeselectMark = () => true,
  onFinish = () => true,
  onMove = () => true,
  onSelectMark = () => true,
  scale = 1,
  played
}) {
  const { canvas } = useContext(SVGContext)

  return marks.map((mark, index) => {
    /*
    mark.tool: the tool definition (e.g. "small red Point")
    mark.videoTime: indicates when the mark was created. Only relevant to certain time-based tools, otherwise undefined.
     */
    const { tool, videoTime } = mark
    const MarkingComponent = mark.toolComponent
    const isActive = mark.id === activeMark?.id

    function isInBounds(markElement) {
      const object = markElement.getBoundingClientRect()
      const bounds = canvas.getBoundingClientRect()
      const notBeyondLeft = object.left + object.width > bounds.left
      const notBeyondRight = object.left < bounds.left + bounds.width
      const notBeyondTop = object.top + object.height > bounds.top
      const notBeyondBottom = object.top < bounds.top + bounds.height
      return notBeyondLeft && notBeyondRight && notBeyondTop && notBeyondBottom
    }

    function deleteMark() {
      activeMark.setSubTaskVisibility(false)
      tool.deleteMark(mark)
      onDelete(mark)
    }

    function moveMark(event, difference) {
      onMove(mark, difference)
    }

    function deselectMark(event) {
      if (event?.currentTarget && !isInBounds(event.currentTarget)) {
        deleteMark()
      } else {
        onDeselectMark(mark)
      }
    }

    function endMoveMark(event) {
      if (event?.currentTarget && !isInBounds(event.currentTarget)) {
        deleteMark()
      } else {
        onFinish(event)
      }
    }

    function selectMark() {
      onSelectMark(mark)
    }

    if (videoTime !== undefined && played < videoTime) return null

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
        onFinish={onFinish}
        onSelect={selectMark}
        scale={scale}
      >
        <MarkingComponent
          active={isActive}
          mark={mark}
          onFinish={onFinish}
          scale={scale}
          played={played}
        />
        {isActive && (
          <DeleteButton
            label={`Delete ${tool.type}`}
            mark={mark}
            scale={scale}
            onDelete={deleteMark}
            onDeselect={deselectMark}
          />
        )}
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

export default DrawingToolMarks
