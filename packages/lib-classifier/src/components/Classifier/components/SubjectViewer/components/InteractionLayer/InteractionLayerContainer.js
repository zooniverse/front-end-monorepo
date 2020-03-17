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
  const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  const activeTool = activeDrawingTask ? activeDrawingTask.activeTool : null
  const disabled = activeTool ? activeTool.disabled : false
  const annotations = classification ? Array.from(classification.annotations.values()) : []
  const drawingAnnotations = annotations.filter(annotation => getType(annotation).name === 'DrawingAnnotation')
  const { activeMark, marks, setActiveMark, setSubTaskVisibility } = activeDrawingTask || {}
  const { consensusLines } = subject.transcriptionReductions || {}
  console.log(consensusLines)
  return {
    activeDrawingTask,
    activeMark,
    activeTool,
    consensusLines,
    disabled,
    drawingAnnotations,
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
      activeDrawingTask,
      activeMark,
      activeTool,
      consensusLines,
      disabled,
      drawingAnnotations,
      height,
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
        {drawingAnnotations.map(annotation =>
          <DrawingToolMarks
            key={annotation.task}
            marks={annotation.value}
            scale={scale}
          />
        )}
        {activeDrawingTask && activeTool &&
          <InteractionLayer
            key={activeDrawingTask.taskKey}
            activeDrawingTask={activeDrawingTask}
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
            {consensusLines && consensusLines.length > 0 && workflow?.usesTranscriptionTask &&
              <TranscribedLines
                lines={consensusLines}
                scale={scale}
                task={activeDrawingTask}
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
  drawingAnnotations: PropTypes.array,
  height: PropTypes.number.isRequired,
  isDrawingInActiveWorkflowStep: PropTypes.bool,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  consensusLines: [],
  drawingAnnotations: [],
  isDrawingInActiveWorkflowStep: false,
  scale: 1
}

export default InteractionLayerContainer
