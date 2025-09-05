import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import DrawingToolMarks from '../DrawingToolMarks'
import SHOWN_MARKS from '@helpers/shownMarks'
import { useStores } from '@hooks'

function storeMapper(classifierStore) {
  const {
    classifications: {
      active: classification
    },
    workflowSteps: {
      activeInteractionTask,
      interactionTask: {
        shownMarks
      }
    }
  } = classifierStore

  const {
    multi_image_clone_markers: multiImageCloneMarkers
  } = classifierStore.workflows?.active?.configuration

  const previousAnnotations = classification?.previousInteractionTaskAnnotations(activeInteractionTask.taskKey) || []

  return {
    multiImageCloneMarkers,
    previousAnnotations,
    shownMarks
  }
}

function PreviousMarks ({
  /** The current active frame in the subject viewer. */
  frame = 0,
}) {
  const {
    /** Clone all previous marks across all frames */
    multiImageCloneMarkers,
    /** Annotations from previous marking tasks. Each annotation is an array of marks. */
    previousAnnotations,
    /** The show/hide previous marks setting. */
    shownMarks = 'ALL'
  } = useStores(storeMapper)

  const marksToShow = shownMarks === SHOWN_MARKS.ALL || shownMarks === SHOWN_MARKS.USER

  if (previousAnnotations?.length > 0 && marksToShow) {
    // Wrapping the array in an react fragment because enzyme errors otherwise 
    // React v16 allows this, though. 
    return (
      <>
        {previousAnnotations.map((annotation) => {
          const annotationValuesPerFrame = (multiImageCloneMarkers)
            ? annotation.value
            : annotation.value.filter(value => value.frame === frame)
          
          return (
            <g
              className='markGroup'
              key={annotation.task}
              pointerEvents='none'
            >
              <DrawingToolMarks
                disabled
                marks={annotationValuesPerFrame}
              />
            </g>
          )
        })}
      </>
    )
  }

  return null
}

PreviousMarks.propTypes = {
  frame: PropTypes.number,
}

export default observer(PreviousMarks)
