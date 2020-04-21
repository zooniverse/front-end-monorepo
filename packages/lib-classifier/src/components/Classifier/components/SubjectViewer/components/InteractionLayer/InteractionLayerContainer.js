import { inject, observer } from 'mobx-react'
import { getType } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingToolMarks from './components/DrawingToolMarks'
import TranscribedLines from './components/TranscribedLines'
import SubTaskPopup from './components/SubTaskPopup'

function storeMapper (stores) {
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps
  const {
    move
  } = stores.classifierStore.subjectViewer
  const {
    active: classification
  } = stores.classifierStore.classifications
  const {
    active: workflow
  } = stores.classifierStore.workflows
  const subject = stores.classifierStore.subjects.active
  const [activeInteractionTask] = activeStepTasks.filter(task => task.type === 'drawing' || task.type === 'transcription')
  const annotations = classification ? Array.from(classification.annotations.values()) : []
  const interactionTaskAnnotations = annotations.filter(annotation => (getType(annotation).name === 'DrawingAnnotation' || getType(annotation).name === 'TranscriptionAnnotation'))
  const { consensusLines } = subject.transcriptionReductions || {}

  return {
    activeInteractionTask,
    consensusLines,
    interactionTaskAnnotations,
    move,
    workflow
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  render () {
    const {
      activeInteractionTask,
      consensusLines,
      height,
      interactionTaskAnnotations,
      move,
      scale,
      workflow,
      width
    } = this.props

    const {
      activeMark,
      activeTool,
      activeToolIndex,
      hidePreviousMarks,
      hidingIndex,
      marks,
      setActiveMark,
      setSubTaskVisibility,
      subTaskMarkBounds,
      subTaskVisibility,
      taskKey
    } = activeInteractionTask

    const visibleMarks = hidePreviousMarks ? marks.slice(hidingIndex) : marks

    return (
      <>
        {!hidePreviousMarks && interactionTaskAnnotations.map(annotation =>
          <DrawingToolMarks
            key={annotation.task}
            marks={annotation.value}
            scale={scale}
          />
        )}
        {activeInteractionTask && activeTool &&
          <InteractionLayer
            activeMark={activeMark}
            activeTool={activeTool}
            activeToolIndex={activeToolIndex}
            disabled={activeTool.disabled}
            height={height}
            key={taskKey}
            marks={visibleMarks}
            move={move}
            scale={scale}
            setActiveMark={setActiveMark}
            setSubTaskVisibility={setSubTaskVisibility}
            width={width}
          >
            {workflow?.usesTranscriptionTask &&
              <TranscribedLines
                lines={consensusLines}
                scale={scale}
                task={activeInteractionTask}
              />
            }
            <SubTaskPopup
              activeMark={activeMark}
              subTaskMarkBounds={subTaskMarkBounds}
              subTaskVisibility={subTaskVisibility}
              setSubTaskVisibility={setSubTaskVisibility}
            />
          </InteractionLayer>
        }
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
    setSubTaskVisibility: PropTypes.func,
    taskKey: PropTypes.string
  }),
  consensusLines: PropTypes.array,
  disabled: PropTypes.bool,
  height: PropTypes.number.isRequired,
  interactionTaskAnnotations: PropTypes.array,
  move: PropTypes.bool,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired,
  workflow: PropTypes.shape({
    usesTranscriptionTask: PropTypes.bool
  })
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  activeInteractionTask: {
    activeMark: undefined,
    activeTool: {
      disabled: false
    },
    marks: [],
    setActiveMark: () => {},
    setSubTaskVisibility: () => {},
    taskKey: ''
  },
  consensusLines: [],
  disabled: false,
  interactionTaskAnnotations: [],
  move: false,
  scale: 1,
  workflow: {
    usesTranscriptionTask: false
  }
}

export default InteractionLayerContainer
