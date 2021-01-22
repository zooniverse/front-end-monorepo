import { inject, observer } from 'mobx-react'
import { getType } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import PreviousMarks from './components/PreviousMarks'
import SHOWN_MARKS from '@helpers/shownMarks'

function storeMapper (stores) {
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps
  const {
    frame,
    move
  } = stores.classifierStore.subjectViewer
  const {
    active: classification
  } = stores.classifierStore.classifications

  const [activeInteractionTask] = activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription')
  const annotations = classification ? Array.from(classification.annotations.values()) : []
  const interactionTaskAnnotations = annotations.filter(annotation => (getType(annotation).name === 'DrawingAnnotation' || getType(annotation).name === 'TranscriptionAnnotation'))

  return {
    activeInteractionTask,
    frame,
    interactionTaskAnnotations,
    move
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  render () {
    const {
      activeInteractionTask,
      frame,
      height,
      interactionTaskAnnotations,
      move,
      scale,
      width
    } = this.props

    const {
      activeMark,
      activeTool,
      activeToolIndex,
      hidingIndex,
      marks,
      setActiveMark,
      shownMarks,
      taskKey
    } = activeInteractionTask

    const newMarks = shownMarks === SHOWN_MARKS.NONE ? marks.slice(hidingIndex) : marks
    const visibleMarksPerFrame = newMarks?.filter(mark => mark.frame === frame)

    return (
      <>
        {activeInteractionTask && activeTool &&
          <InteractionLayer
            activeMark={activeMark}
            activeTool={activeTool}
            activeToolIndex={activeToolIndex}
            disabled={activeTool.disabled}
            frame={frame}
            height={height}
            key={taskKey}
            marks={visibleMarksPerFrame}
            move={move}
            scale={scale}
            setActiveMark={setActiveMark}
            width={width}
          />
        }
        <PreviousMarks scale={scale} />
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  activeInteractionTask: PropTypes.shape({
    activeMark: PropTypes.object,
    activeTool: PropTypes.shape({
      disabled: PropTypes.bool
    }),
    marks: PropTypes.array,
    setActiveMark: PropTypes.func,
    shownMarks: PropTypes.string,
    taskKey: PropTypes.string
  }),
  disabled: PropTypes.bool,
  frame: PropTypes.number,
  height: PropTypes.number.isRequired,
  interactionTaskAnnotations: PropTypes.array,
  move: PropTypes.bool,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  activeInteractionTask: {
    activeMark: undefined,
    activeTool: {
      disabled: false
    },
    marks: [],
    setActiveMark: () => {},
    shownMarks: SHOWN_MARKS.ALL,
    taskKey: ''
  },
  disabled: false,
  frame: 0,
  interactionTaskAnnotations: [],
  move: false,
  scale: 1
}

export default InteractionLayerContainer
