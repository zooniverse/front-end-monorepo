import { useContext } from 'react';
import PropTypes from 'prop-types'
import { DeleteButton, Mark } from '@plugins/drawingTools/components'
import { LineControls } from '@plugins/drawingTools/experimental/components'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'

import { isInBounds } from '../../helpers/isInBounds.js'

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
          id={`mark-${mark.id}`}
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
}

export default DrawingToolMarks
