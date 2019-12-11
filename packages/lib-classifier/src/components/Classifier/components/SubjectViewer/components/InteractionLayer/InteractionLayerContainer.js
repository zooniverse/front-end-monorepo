import { inject, observer } from 'mobx-react'
import { getType } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DrawingToolRoot } from '@plugins/drawingTools/components'

import InteractionLayer from './InteractionLayer'

function storeMapper (stores) {
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps
  const {
    move
  } = stores.classifierStore.subjectViewer
  const {
    active: classification,
  } = stores.classifierStore.classifications
  const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  const activeTool = activeDrawingTask ? activeDrawingTask.activeTool : null
  const disabled = activeTool ? activeTool.disabled : false
  const drawingAnnotations = Array.from(classification.annotations.values())
    .filter(annotation => getType(annotation).name === 'DrawingAnnotation')
  return {
    activeDrawingTask,
    activeTool,
    disabled,
    drawingAnnotations,
    move
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  render () {
    const { activeDrawingTask, activeTool, disabled, drawingAnnotations, height, move, scale, width } = this.props
    return (
      <>
        {drawingAnnotations.map(annotation =>
          annotation.value.map((mark, index) => {
            const MarkingComponent = mark.toolComponent
            return (
              <DrawingToolRoot
                key={mark.id}
                label={`${mark.tool.type} ${index}`}
                isActive={false}
                mark={mark}
              >
                <MarkingComponent
                  mark={mark}
                  scale={scale}
                />
              </DrawingToolRoot>
            )
          })
        )}
        {activeDrawingTask && activeTool &&
          <InteractionLayer
            key={activeDrawingTask.taskKey}
            activeDrawingTask={activeDrawingTask}
            activeTool={activeTool}
            disabled={disabled}
            height={height}
            move={move}
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
