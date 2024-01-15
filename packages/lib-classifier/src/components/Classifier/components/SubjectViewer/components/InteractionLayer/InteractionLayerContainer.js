import { tryReference } from 'mobx-state-tree'
import PropTypes from 'prop-types'

import InteractionLayer from './InteractionLayer'
import PreviousMarks from './components/PreviousMarks'
import SHOWN_MARKS from '@helpers/shownMarks'
import { withStores } from '@helpers'
import locationValidator from '../../helpers/locationValidator'

function storeMapper(classifierStore) {
  const activeStepAnnotations = classifierStore.subjects.active?.stepHistory?.latest?.annotations
  const { activeStepTasks } = classifierStore.workflowSteps
  const { frame: viewerStoreFrame, move } = classifierStore.subjectViewer
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
    taskKey,
    viewerStoreFrame
  }
}

export function InteractionLayerContainer({
  activeMark,
  activeTool,
  activeToolIndex,
  annotation,
  disabled = false,
  duration,
  frame = 0,
  height,
  hidingIndex,
  marks = [],
  move = false,
  multiImageCloneMarkers = false,
  played,
  scale = 1,
  setActiveMark = () => { },
  shownMarks = SHOWN_MARKS.ALL,
  subject,
  taskKey = '',
  viewBox,
  width,
  viewerStoreFrame = 0
}) {
  /*
   * If a transcription task using MultiFrameViewer, we want frame number from SubjectViewerStore
   * Otherwise, frame is passed to InteractionLayer via Flipbook or SeparateFrame, so use that prop
   */
  let interactionFrame = viewerStoreFrame
  if (annotation?.taskType !== 'transcription') {
    interactionFrame = multiImageCloneMarkers ? 0 : frame
  }

  /*
   * SHOWN_MARkS is a UI toggle in the subject viewer
   */
  const newMarks = shownMarks === SHOWN_MARKS.NONE ? marks.slice(hidingIndex) : marks

  /*
   * Only show marks per the currently viewed frame
   */
  const visibleMarksPerFrame = newMarks?.filter(mark => mark.frame === interactionFrame)

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
          frame={interactionFrame}
          height={height}
          key={taskKey}
          marks={visibleMarksPerFrame}
          move={move}
          played={played}
          setActiveMark={setActiveMark}
          scale={scale}
          subject={subject}
          viewBox={viewBox}
          width={width}
        />
      )}
      <PreviousMarks frame={interactionFrame} scale={scale} />
    </>
  )
}

InteractionLayerContainer.propTypes = {
  activeMark: PropTypes.object,
  activeTool: PropTypes.object,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  /** Passed from parent subject viewer. Different source of truth depedendent on Flipbook, MultiFrame, or SeparateFrame */
  frame: PropTypes.number,
  height: PropTypes.number.isRequired,
  interactionTaskAnnotations: PropTypes.array,
  marks: PropTypes.array,
  move: PropTypes.bool,
  /** Config set in workflow editor for non-transcription multi-image drawing workflows */
  multiImageCloneMarkers: PropTypes.bool,
  played: PropTypes.number,
  scale: PropTypes.number,
  setActiveMark: PropTypes.func,
  shownMarks: PropTypes.string,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }),
  taskKey: PropTypes.string,
  width: PropTypes.number.isRequired
}

export default withStores(InteractionLayerContainer, storeMapper)
