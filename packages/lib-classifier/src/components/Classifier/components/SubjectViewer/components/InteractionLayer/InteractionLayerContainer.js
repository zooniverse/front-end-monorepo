import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import InteractionLayer from './InteractionLayer'

function storeMapper (stores) {
  const {
    activeStepTasks
  } = stores.classifierStore.workflowSteps
  const [activeDrawingTask] = activeStepTasks.filter(task => task.type === 'drawing')
  return {
    activeDrawingTask
  }
}

@inject(storeMapper)
@observer
class InteractionLayerContainer extends Component {
  render () {
    const { activeDrawingTask, svg } = this.props
    return activeDrawingTask ? <InteractionLayer activeDrawingTask={activeDrawingTask} svg={svg} /> : null
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
