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
        if (!classification.annotations.get(task.taskKey)) {
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

  render () {
    const { isThereANextStep, isThereAPreviousStep, completeClassification } = this.props
    return (
      <TaskNavButtons
        goToNextStep={this.goToNextStep.bind(this)}
        goToPreviousStep={this.goToPreviousStep.bind(this)}
        showBackButton={isThereAPreviousStep()}
        showNextButton={isThereANextStep()}
        completeClassification={completeClassification}
      />
    )
  }
}

TaskNavButtons.defaultProps = {
  classification: {},
  completeClassification: () => {},
  createDefaultAnnotation: () => {},
  selectStep: () => {},
  tasks: []
}

TaskNavButtonsContainer.propTypes = {
  classification: PropTypes.shape({
    annotation: MobXPropTypes.observableArrayOf(PropTypes.object)
  }),
  completeClassification: PropTypes.func,
  createDefaultAnnotation: PropTypes.func,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  selectStep: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

export default TaskNavButtonsContainer
