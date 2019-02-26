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
    shouldWeShowDoneAndTalkButton,
    selectStep
  } = stores.classifierStore.workflowSteps
  const {
    active: classification,
    completeClassification,
    createDefaultAnnotation,
    removeAnnotation
  } = stores.classifierStore.classifications

  return {
    classification,
    completeClassification,
    createDefaultAnnotation,
    getPreviousStepKey,
    isThereANextStep,
    isThereAPreviousStep,
    removeAnnotation,
    selectStep,
    shouldWeShowDoneAndTalkButton,
    step,
    tasks
  }
}

@inject(storeMapper)
@observer
class TaskNavButtonsContainer extends React.Component {
  createDefaultAnnotationIfThereIsNone () {
    const { classification, createDefaultAnnotation, tasks } = this.props
    if (classification) {
      tasks.forEach((task) => {
        // User didn't submit annotation and task is not required
        // Create the default annotation before going to the next step
        if (classification.annotations && !(classification.annotations.get(task.taskKey))) {
          createDefaultAnnotation(task)
        }
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
    this.createDefaultAnnotationIfThereIsNone()
    selectStep()
  }

  onSubmit (event) {
    event.preventDefault()
    const { completeClassification } = this.props
    this.createDefaultAnnotationIfThereIsNone()
    completeClassification()
  }

  render () {
    const { isThereANextStep, isThereAPreviousStep, shouldWeShowDoneAndTalkButton, completeClassification } = this.props
    return (
      <TaskNavButtons
        goToNextStep={this.goToNextStep.bind(this)}
        goToPreviousStep={this.goToPreviousStep.bind(this)}
        showBackButton={isThereAPreviousStep()}
        showNextButton={isThereANextStep()}
        onSubmit={this.onSubmit.bind(this)}
        showDoneAndTalkLink={shouldWeShowDoneAndTalkButton()}
        completeClassification={completeClassification}
      />
    )
  }
}

TaskNavButtonsContainer.wrappedComponent.defaultProps = {
  completeClassification: () => {},
  createDefaultAnnotation: () => {},
  selectStep: () => {},
  tasks: []
}

TaskNavButtonsContainer.wrappedComponent.propTypes = {
  classification: PropTypes.shape({
    annotations: MobXPropTypes.observableMap
  }),
  completeClassification: PropTypes.func,
  createDefaultAnnotation: PropTypes.func,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  selectStep: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

export default TaskNavButtonsContainer
