import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function storeMapper (stores) {
  const { loadingState } = stores.classifierStore.workflows
  const {
    active: step,
    activeStepTasks: tasks,
    isThereANextStep: showNextButton,
    selectStep,
  } = stores.classifierStore.workflowSteps
  const { active: classification } = stores.classifierStore.classifications

  return {
    classification,
    loadingState,
    showNextButton,
    selectStep,
    step,
    tasks
  }
}

@inject(storeMapper)
@observer
class TaskNavButtonsContainer extends React.Component {
  goToNextStep () {
    const { selectStep } = this.props
    selectStep()
  }

  render () {
    const { showNextButton } = this.props
    return (
      <TaskNavButtons
        goToNextStep={this.goToNextStep.bind(this)}
        showNextButton={showNextButton}
      />
    )
  }
}

export default TaskNavButtonsContainer