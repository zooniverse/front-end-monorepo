import { inject, observer } from 'mobx-react'
import { getType } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { DrawingToolRoot } from '@plugins/drawingTools/components'

import InteractionLayer from './InteractionLayer'

function storeMapper (stores) {
  const {
    activeStepTasks,
    tasks
  } = stores.classifierStore.workflowSteps
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
    tasks
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  render () {
    const { activeDrawingTask, activeTool, disabled, drawingAnnotations, svg, tasks } = this.props
    return (
      <>
        {drawingAnnotations.map(annotation =>
          annotation.value.map(mark => {
            const MarkingComponent = mark.toolComponent
            const [ task ] = tasks.filter(task => task.taskKey === annotation.task)
            const tool = task.tools[mark.toolIndex]
            return (
              <DrawingToolRoot
                key={mark.id}
                isActive={false}
                mark={mark}
                svg={svg}
                tool={tool}
              >
                <MarkingComponent
                  mark={mark}
                  svg={svg}
                  tool={tool}
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
            svg={svg}
          />
        }
      </>
    )
  }
}

InteractionLayerContainer.wrappedComponent.propTypes = {
  drawingAnnotations: PropTypes.array,
  isDrawingInActiveWorkflowStep: PropTypes.bool,
  svg: PropTypes.object
}

InteractionLayerContainer.wrappedComponent.defaultProps = {
  drawingAnnotations: [],
  isDrawingInActiveWorkflowStep: false
}

export default InteractionLayerContainer
