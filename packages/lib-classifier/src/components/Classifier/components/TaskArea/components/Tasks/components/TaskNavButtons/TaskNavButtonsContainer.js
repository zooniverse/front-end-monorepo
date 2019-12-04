import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function storeMapper (stores) {
  const {
    active: step,
    activeStepTasks: tasks,
    getPreviousStepKey,
    isThereANextStep,
    isThereAPreviousStep,
    selectStep
  } = stores.classifierStore.workflowSteps
  const {
    active: classification,
    completeClassification,
    removeAnnotation
  } = stores.classifierStore.classifications

  return {
    classification,
    completeClassification,
    getPreviousStepKey,
    isThereANextStep,
    isThereAPreviousStep,
    removeAnnotation,
    selectStep,
    step,
    tasks
  }
}

@inject(storeMapper)
@observer
class TaskNavButtonsContainer extends React.Component {
  completeStepTasks () {
    const { classification, tasks } = this.props
    if (classification) {
      tasks.forEach((task) => {
        task.complete()
      })
    }
  }

  goToPreviousStep () {
    const {
      isThereAPreviousStep,
      getPreviousStepKey,
      removeAnnotation,
      selectStep,
      step
    } = this.props

    if (isThereAPreviousStep()) {
      const previousStep = getPreviousStepKey()
      step.taskKeys.forEach((taskKey) => {
        removeAnnotation(taskKey)
      })
      selectStep(previousStep)
    }
  }

  goToNextStep () {
    const { selectStep } = this.props
    this.completeStepTasks()
    selectStep()
  }

  onSubmit (event) {
    event.preventDefault()
    const { completeClassification } = this.props
    this.completeStepTasks()
    return completeClassification()
  }

  render () {
    const { disabled, isThereANextStep, isThereAPreviousStep } = this.props

    return (
      <TaskNavButtons
        disabled={disabled}
        goToNextStep={this.goToNextStep.bind(this)}
        goToPreviousStep={this.goToPreviousStep.bind(this)}
        showBackButton={isThereAPreviousStep()}
        showNextButton={isThereANextStep()}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

TaskNavButtonsContainer.wrappedComponent.defaultProps = {
  completeClassification: () => {},
  disabled: false,
  selectStep: () => {},
  tasks: []
}

TaskNavButtonsContainer.wrappedComponent.propTypes = {
  classification: PropTypes.shape({
    annotations: MobXPropTypes.observableMap
  }),
  completeClassification: PropTypes.func,
  disabled: PropTypes.bool,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  selectStep: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

export default TaskNavButtonsContainer
