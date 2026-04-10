import { tryReference } from 'mobx-state-tree'
import PropTypes from 'prop-types'

import LineControls from './LineControls'
import SHOWN_MARKS from '@helpers/shownMarks'
import { withStores } from '@helpers'

function storeMapper (classifierStore) {
  const {
    multi_image_clone_markers: multiImageCloneMarkers
  } = classifierStore.workflows?.active?.configuration

  const { activeInteractionTask } = classifierStore.workflowSteps
  const {
    deleteMark,
    hiddenMarkIds,
    shownMarks
  } = activeInteractionTask

  const activeMark = tryReference(() => activeInteractionTask.activeMark)
  const visibleFreehandLineMark = (
    activeMark &&
    activeMark.tool.type === 'freehandLine' &&
    !(shownMarks === SHOWN_MARKS.NONE && hiddenMarkIds.includes(activeMark.id))
  )
    ? activeMark
    : undefined

  return {
    deleteMark,
    mark: visibleFreehandLineMark,
    multiImageCloneMarkers
  }
}

export function LineControlsContainer ({
  deleteMark,
  frame = 0,
  mark,
  multiImageCloneMarkers
}) {
  return (
    mark &&
    (multiImageCloneMarkers || mark.frame === frame) &&
      <LineControls
        mark={mark}
        onDelete={deleteMark}
      />
  )
}

LineControlsContainer.propTypes = {
  deleteMark: PropTypes.func,
  frame: PropTypes.number,
  mark: PropTypes.object,
  multiImageCloneMarkers: PropTypes.bool
}

export default withStores(LineControlsContainer, storeMapper)
