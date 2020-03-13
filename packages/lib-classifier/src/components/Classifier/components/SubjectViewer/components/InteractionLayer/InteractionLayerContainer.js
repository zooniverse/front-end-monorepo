import { inject, observer } from 'mobx-react'
import { getType } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'
import DrawingToolMarks from './components/DrawingToolMarks'

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
  const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  const activeTool = activeDrawingTask ? activeDrawingTask.activeTool : null
  const disabled = activeTool ? activeTool.disabled : false
  const annotations = classification ? Array.from(classification.annotations.values()) : []
  const drawingAnnotations = annotations.filter(annotation => getType(annotation).name === 'DrawingAnnotation')
  const { activeMark, marks, setActiveMark, setSubTaskVisibility } = activeDrawingTask || {}
  return {
    activeDrawingTask,
    activeMark,
    activeTool,
    disabled,
    drawingAnnotations,
    marks,
    move,
    setActiveMark,
    setSubTaskVisibility,
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
      disabled,
      drawingAnnotations,
      height,
      marks,
      move,
      setActiveMark,
      setSubTaskVisibility,
      scale,
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
          />
        }
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  drawingAnnotations: PropTypes.array,
  height: PropTypes.number.isRequired,
  isDrawingInActiveWorkflowStep: PropTypes.bool,
  scale: PropTypes.number,
  width: PropTypes.number.isRequired
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  drawingAnnotations: [],
  isDrawingInActiveWorkflowStep: false,
  scale: 1
}

export default InteractionLayerContainer
