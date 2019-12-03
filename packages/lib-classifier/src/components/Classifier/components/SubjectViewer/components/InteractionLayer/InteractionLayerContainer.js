import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'

function storeMapper (stores) {
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps
  const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  const activeTool = activeDrawingTask ? activeDrawingTask.activeTool : null
  const disabled = activeTool ? activeTool.disabled : false
  return {
    activeDrawingTask,
    activeTool,
    disabled
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  render () {
    const { activeDrawingTask, activeTool, disabled, svg } = this.props
    return activeDrawingTask && activeTool ? 
    <InteractionLayer
      key={activeDrawingTask.taskKey}
      activeDrawingTask={activeDrawingTask}
      activeTool={activeTool}
      disabled={disabled}
      svg={svg}
    /> : 
    null
  }
}

InteractionLayerContainer.propTypes = {
  isDrawingInActiveWorkflowStep: PropTypes.bool,
  svg: PropTypes.object
}

InteractionLayerContainer.defaultProps = {
  isDrawingInActiveWorkflowStep: false
}

export default InteractionLayerContainer
