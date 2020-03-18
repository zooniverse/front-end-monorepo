import { inject, observer } from 'mobx-react'
import { getType } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingToolMarks from './components/DrawingToolMarks'
import TranscribedLines from './components/TranscribedLines'

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
  const activeTool = activeInteractionTask ? activeInteractionTask.activeTool : null
  const disabled = activeTool ? activeTool.disabled : false
  const annotations = classification ? Array.from(classification.annotations.values()) : []
  const interactionTaskAnnotations = annotations.filter(annotation => getType(annotation).name === ('DrawingAnnotation' || 'TranscriptionAnnotation'))
  const { activeMark, marks, setActiveMark, setSubTaskVisibility } = activeInteractionTask || {}
  const { consensusLines } = subject.transcriptionReductions || {}

  return {
    activeInteractionTask,
    activeMark,
    activeTool,
    consensusLines,
    disabled,
    interactionTaskAnnotations,
    marks,
    move,
    setActiveMark,
    setSubTaskVisibility,
    workflow
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  render () {
    const {
      activeInteractionTask,
      activeMark,
      activeTool,
      consensusLines,
      disabled,
      height,
      interactionTaskAnnotations,
      marks,
      move,
      setActiveMark,
      setSubTaskVisibility,
      scale,
      workflow,
      width
    } = this.props
    return (
      <>
        {interactionTaskAnnotations.map(annotation =>
          <DrawingToolMarks
            key={annotation.task}
            marks={annotation.value}
            scale={scale}
          />
        )}
        {activeInteractionTask && activeTool &&
          <InteractionLayer
            key={activeInteractionTask.taskKey}
            activeInteractionTask={activeInteractionTask}
            activeMark={activeMark}
            activeTool={activeTool}
            disabled={disabled}
            height={height}
            marks={marks}
            move={move}
            setActiveMark={setActiveMark}
            setSubTaskVisibility={setSubTaskVisibility}
            scale={scale}
            width={width}
          >
            {workflow?.usesTranscriptionTask &&
              <TranscribedLines
                lines={consensusLines}
                scale={scale}
                task={activeInteractionTask}
              />
            }
          </InteractionLayer>
        }
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  consensusLines: PropTypes.array,
  height: PropTypes.number.isRequired,
  interactionTaskAnnotations: PropTypes.array,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  consensusLines: [],
  interactionTaskAnnotations: [],
  scale: 1
}

export default InteractionLayerContainer
