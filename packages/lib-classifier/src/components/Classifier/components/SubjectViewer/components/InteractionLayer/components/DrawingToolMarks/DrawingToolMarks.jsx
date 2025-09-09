import { useContext } from 'react'
import PropTypes from 'prop-types'
import { DeleteButton, Mark } from '@plugins/drawingTools/components'
import { LineControls } from '@plugins/drawingTools/experimental/components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import { isInBounds } from '../../helpers/isInBounds.js'
/**
 * Render selectable, editable marks for the current drawing task.
 */
function DrawingToolMarks({
  activeMark = {
    id: '',
    setSubTaskVisibility: () => { }
  },
  disabled = false,
  marks = [],
  onDelete = () => true,
  onDeselectMark = () => true,
  onFinish = () => true,
  onMove = () => true,
  onSelectMark = () => true,
  pointerEvents = 'painted',
  played,
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

    function deleteMark() {
      activeMark.setSubTaskVisibility(false)
      tool.deleteMark(mark)
      onDelete(mark)
    }

    function moveMark(_event, difference) {
      onMove(mark, difference)
    }

    function deselectMark(event) {
      if (event?.currentTarget && !isInBounds(event.currentTarget, canvas)) {
        deleteMark()
      } else {
        onDeselectMark(mark)
      }
    }

    function endMoveMark(event) {
      if (event?.currentTarget && !isInBounds(event.currentTarget, canvas)) {
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
      <g key={mark.id}>
        <Mark
          isActive={isActive}
          coords={mark.coords}
          disabled={disabled}
          dragStart={selectMark}
          dragMove={moveMark}
          dragEnd={endMoveMark}
          label={`Mark ${index}`}
          mark={mark}
          onDelete={deleteMark}
          onFinish={onFinish}
          onSelect={selectMark}
          pointerEvents={isActive ? 'painted' : pointerEvents}
        >
          <MarkingComponent
            active={isActive}
            mark={mark}
            onFinish={onFinish}
            played={played}
          />
          {isActive && mark.tool.type !== 'freehandLine' && (
            <DeleteButton
              label={`Delete ${tool.type}`}
              mark={mark}
              onDelete={deleteMark}
              onDeselect={deselectMark}
            />
          )}
        </Mark>
        {isActive && mark.tool.type == 'freehandLine' && (
          <LineControls
            mark={mark}
            onDelete={deleteMark}
          />
        )}
      </g>
    )
  })
}

DrawingToolMarks.propTypes = {
  /** Current selected mark. */
  activeMark: PropTypes.shape({
    id: PropTypes.string,
    setSubTaskVisibility: PropTypes.func
  }),
  /** A list of marks for the current drawing task. */
  marks: PropTypes.array.isRequired,
  /** Callback after deleting a mark. */
  onDelete: PropTypes.func,
  /** Callback after deselecting a mark. */
  onDeselectMark: PropTypes.func,
  /** Callback after moving a mark. */
  onFinish: PropTypes.func,
  /** Callback while moving a mark. */
  onMove: PropTypes.func,
  /** Callback on selecting a mark. */
  onSelectMark: PropTypes.func,
  /** pointer-events style for each mark. */
  pointerEvents: PropTypes.oneOf(['all', 'none', 'painted']),
}

export default DrawingToolMarks
