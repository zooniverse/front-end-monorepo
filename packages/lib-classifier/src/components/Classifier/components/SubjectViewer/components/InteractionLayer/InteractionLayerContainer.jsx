import { tryReference } from 'mobx-state-tree'
import PropTypes from 'prop-types'

import InteractionLayer from './InteractionLayer'
import PreviousMarks from './components/PreviousMarks'
import SHOWN_MARKS from '@helpers/shownMarks'
import { withStores } from '@helpers'

function storeMapper(classifierStore) {
  const activeStepAnnotations = classifierStore.subjects.active?.stepHistory?.latest?.annotations
  const { activeStepTasks } = classifierStore.workflowSteps
  const { move } = classifierStore.subjectViewer
  const {
    multi_image_clone_markers: multiImageCloneMarkers
  } = classifierStore.workflows?.active?.configuration

  const [activeInteractionTask] = activeStepTasks.filter(
    (task) => task.type === 'drawing' || task.type === 'transcription'
  )
  const annotation = activeStepAnnotations?.find(
    annotation => annotation.taskType === 'drawing' || annotation.taskType === 'transcription'
  )

  const {
    activeTool,
    activeToolIndex,
    hidingIndex,
    marks,
    setActiveMark,
    shownMarks,
    taskKey
  } = activeInteractionTask || {}

  const activeMark = tryReference(() => activeInteractionTask?.activeMark)
  const disabled = activeTool?.disabled

  return {
    activeMark,
    activeTool,
    activeToolIndex,
    annotation,
    disabled,
    hidingIndex,
    marks,
    move,
    multiImageCloneMarkers,
    setActiveMark,
    shownMarks,
    taskKey
  }
}

export function InteractionLayerContainer({
  activeMark,
  activeTool,
  activeToolIndex,
  annotation,
  disabled = false,
  frame = 0,
  height,
  hidingIndex,
  marks = [],
  move = false,
  multiImageCloneMarkers = false,
  setActiveMark = () => { },
  shownMarks = SHOWN_MARKS.ALL,
  taskKey = '',
  width,
  played,
  duration
}) {
  const newMarks =
    shownMarks === SHOWN_MARKS.NONE ? marks.slice(hidingIndex) : marks
  const visibleMarksPerFrame = (multiImageCloneMarkers)
    ? newMarks
    : newMarks?.filter((mark) => mark.frame === frame)
    
  return (
    <>
      {activeTool && (
        <InteractionLayer
          activeMark={activeMark}
          activeTool={activeTool}
          activeToolIndex={activeToolIndex}
          annotation={annotation}
          disabled={disabled}
          duration={duration}
          frame={frame}
          height={height}
          key={taskKey}
          marks={visibleMarksPerFrame}
          move={move}
          multiImageCloneMarkers={multiImageCloneMarkers}
          played={played}
          setActiveMark={setActiveMark}
          width={width}
        />
      )}
      <PreviousMarks
        frame={frame}
      />
    </>
  )
}

InteractionLayerContainer.propTypes = {
  activeMark: PropTypes.object,
  activeTool: PropTypes.object,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  /** Index of the Frame. Always inherits from SingleImageViewer, which inherits from the Viewer */
  frame: PropTypes.number,
  height: PropTypes.number.isRequired,
  interactionTaskAnnotations: PropTypes.array,
  marks: PropTypes.array,
  move: PropTypes.bool,
  played: PropTypes.number,
  setActiveMark: PropTypes.func,
  shownMarks: PropTypes.string,
  taskKey: PropTypes.string,
  width: PropTypes.number.isRequired
}

export default withStores(InteractionLayerContainer, storeMapper)
