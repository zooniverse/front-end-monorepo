import PropTypes from 'prop-types'
import React from 'react'

import InteractionLayer from './InteractionLayer'
import PreviousMarks from './components/PreviousMarks'
import SHOWN_MARKS from '@helpers/shownMarks'
import { withStores } from '@helpers'

function storeMapper(classifierStore) {
  const activeStepAnnotations = classifierStore.subjects.active?.stepHistory.latest.annotations
  const { activeStepTasks } = classifierStore.workflowSteps
  const { frame, move } = classifierStore.subjectViewer

  const [activeInteractionTask] = activeStepTasks.filter(
    (task) => task.type === 'drawing' || task.type === 'transcription'
  )
  const annotation = activeStepAnnotations.find(
    annotation => annotation.taskType === 'drawing' || annotation.taskType === 'transcription'
  )

  const {
    activeMark,
    activeTool,
    activeToolIndex,
    hidingIndex,
    marks,
    setActiveMark,
    shownMarks,
    taskKey
  } = activeInteractionTask || {}

  const disabled = activeTool?.disabled

  return {
    activeMark,
    activeTool,
    activeToolIndex,
    annotation,
    frame,
    hidingIndex,
    marks,
    move,
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
  scale = 1,
  setActiveMark = () => {},
  shownMarks = SHOWN_MARKS.ALL,
  taskKey = '',
  width,
  played,
  duration
}) {

  const newMarks =
    shownMarks === SHOWN_MARKS.NONE ? marks.slice(hidingIndex) : marks
  const visibleMarksPerFrame = newMarks?.filter(
    (mark) => mark.frame === frame
  )

  return (
    <>
      {activeTool && (
        <InteractionLayer
          activeMark={activeMark}
          activeTool={activeTool}
          activeToolIndex={activeToolIndex}
          annotation={annotation}
          disabled={disabled}
          frame={frame}
          height={height}
          key={taskKey}
          marks={visibleMarksPerFrame}
          move={move}
          scale={scale}
          played={played}
          duration={duration}
          setActiveMark={setActiveMark}
          width={width}
        />
      )}
      <PreviousMarks scale={scale} />
    </>
  )
}

InteractionLayerContainer.propTypes = {
  activeMark: PropTypes.object,
  activeTool: PropTypes.object,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  frame: PropTypes.number,
  height: PropTypes.number.isRequired,
  interactionTaskAnnotations: PropTypes.array,
  marks: PropTypes.array,
  move: PropTypes.bool,
  played: PropTypes.number,
  scale: PropTypes.number,
  setActiveMark: PropTypes.func,
  shownMarks: PropTypes.string,
  taskKey: PropTypes.string,
  width: PropTypes.number.isRequired
}

export default withStores(InteractionLayerContainer, storeMapper)
