import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'

import DrawingToolMarks from '../DrawingToolMarks'
import SHOWN_MARKS from '@helpers/shownMarks'
import { useStores } from '@hooks'
import { getSnapshot } from 'mobx-state-tree'

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

  const previousAnnotations = classification?.previousInteractionTaskAnnotations(activeInteractionTask.taskKey) || []

  return {
    previousAnnotations,
    shownMarks
  }
}

function PreviousMarks ({
  /** The current active frame in the subject viewer. */
  frame = 0,
  /** SVG image scale (client size / natural size.)*/
  scale = 1
}) {
  const {
    /** Annotations from previous marking tasks. Each annotation is an array of marks. */
    previousAnnotations,
    /** The show/hide previous marks setting. */
    shownMarks = 'ALL'
  } = useStores(storeMapper)

  /** Won't show any marks if SHOWN_MARKS.NONE */
  const marksToShow = shownMarks === SHOWN_MARKS.ALL || shownMarks === SHOWN_MARKS.USER

  if (previousAnnotations?.length > 0 && marksToShow) {
    return (
      <>
        {previousAnnotations.map((annotation) => {
          const annotationMarks = annotation.toSnapshot()[0].value
          console.log(annotationMarks)

          /* `annotation` is a DrawingAnnotation type while annotation.value is an array of Marks */
          const annotationMarksPerFrame = annotation.value.filter(mark => mark.frame === frame)

          return (
            <g
              className='markGroup'
              key={annotation.task}
              pointerEvents='none'
            >
              <DrawingToolMarks
                disabled
                marks={annotationMarksPerFrame}
                scale={scale}
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
  scale: PropTypes.number
}

export default observer(PreviousMarks)
