import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function storeMapper (stores) {
  const {
    active: step,
    activeStepTasks: tasks,
    isThereANextStep: showNextButton,
    isThereAPreviousStep: showBackButton,
    selectStep,
    steps
  } = stores.classifierStore.workflowSteps
  const { active: classification, createDefaultAnnotation } = stores.classifierStore.classifications

  return {
    classification,
    createDefaultAnnotation,
    showBackButton,
    showNextButton,
    selectStep,
    step,
    steps,
    tasks
  }
}

@inject(storeMapper)
@observer
class TaskNavButtonsContainer extends React.Component {
  createDefaultAnnotationIfThereIsNone() {
    const { classification, createDefaultAnnotation, tasks } = this.props
    if (classification) {
      tasks.forEach((task) => {
        // User didn't submit annotation and task is not required
        // Create the default annotation before going to the next step
        if (!classification.annotations.get(task.taskKey)) {
          createDefaultAnnotation(task)
        }
      })
    }
  }

  goToPreviousStep () {
    const { selectStep, step, steps } = this.props
    const stepsKeys = Array.from(steps.keys())
    const currentStepIndex = stepsKeys.indexOf(step.stepKey)
    const previousStep = stepsKeys[currentStepIndex - 1]
    if (previousStep) selectStep(previousStep)
  }

  goToNextStep () {
    const { selectStep } = this.props
    this.createDefaultAnnotationIfThereIsNone()
    selectStep()
  }

  render () {
    const { showBackButton, showNextButton } = this.props
    return (
      <TaskNavButtons
        goToNextStep={this.goToNextStep.bind(this)}
        goToPreviousStep={this.goToPreviousStep.bind(this)}
        showBackButton={showBackButton}
        showNextButton={showNextButton}
      />
    )
  }
}

TaskNavButtons.defaultProps = {
  classification: {},
  createDefaultAnnotation: () => {},
  selectStep: () => {},
  tasks: []
}

TaskNavButtonsContainer.propTypes = {
  classification: PropTypes.shape({
    annotation: MobXPropTypes.observableArrayOf(PropTypes.object)
  }),
  createDefaultAnnotation: PropTypes.func,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  selectStep: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

export default TaskNavButtonsContainer
