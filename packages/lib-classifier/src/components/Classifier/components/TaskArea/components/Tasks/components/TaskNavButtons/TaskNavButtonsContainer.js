import React from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function storeMapper ({ classifierStore }) {
  const {
    annotatedSteps,
    classifications,
    workflowSteps
  } = classifierStore
  const {
    active: step,
    activeStepTasks: tasks,
    selectStep
  } = workflowSteps
  const {
    active: classification,
    completeClassification,
    removeAnnotation
  } = classifications

  return {
    annotatedSteps,
    classification,
    completeClassification,
    removeAnnotation,
    selectStep,
    step,
    tasks
  }
}

class TaskNavButtonsContainer extends React.Component {
  constructor() {
    super()
    this.goToNextStep = this.goToNextStep.bind(this)
    this.goToPreviousStep = this.goToPreviousStep.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  completeStepTasks () {
    const { classifierStore } = this.props.store ?? this.context
    const { classification, tasks } = storeMapper({ classifierStore })
    if (classification) {
      tasks.forEach((task) => {
        task.complete()
      })
    }
  }

  goToPreviousStep () {
    const { classifierStore } = this.props.store ?? this.context
    const {
      annotatedSteps,
      removeAnnotation,
      selectStep,
      step
    } = storeMapper({ classifierStore })
    if (annotatedSteps.canUndo) {
      const previousStep = annotatedSteps.latest.step
      step.taskKeys.forEach((taskKey) => {
        removeAnnotation(taskKey)
      })
      selectStep(previousStep.stepKey)
      annotatedSteps.back()
    }
  }

  goToNextStep () {
    const { classifierStore } = this.props.store ?? this.context
    const {
      annotatedSteps,
      classification,
      selectStep,
      step,
      tasks
    } = storeMapper({ classifierStore })
    this.completeStepTasks()
    const annotations = tasks.map(task => classification.annotation(task))
    annotatedSteps.next({
      step,
      annotations
    })
    selectStep()
  }

  onSubmit (event) {
    event.preventDefault()
    const { classifierStore } = this.props.store ?? this.context
    const { completeClassification } = storeMapper({ classifierStore })
    this.completeStepTasks()
    return completeClassification()
  }

  render () {
    const {
      goToNextStep,
      goToPreviousStep,
      onSubmit
    } = this
    const { disabled } = this.props
    const { classifierStore } = this.props.store ?? this.context
    const { annotatedSteps, step } = storeMapper({ classifierStore })
    const { canUndo } = annotatedSteps
    const { isThereANextStep }= step

    return (
      <TaskNavButtons
        disabled={disabled}
        goToNextStep={goToNextStep}
        goToPreviousStep={goToPreviousStep}
        showBackButton={canUndo}
        showNextButton={isThereANextStep}
        onSubmit={onSubmit}
      />
    )
  }
}

TaskNavButtonsContainer.contextType = MobXProviderContext

TaskNavButtonsContainer.defaultProps = {
  completeClassification: () => {},
  disabled: false,
  selectStep: () => {},
  step: {
    isThereANextStep: false
  },
  tasks: []
}

TaskNavButtonsContainer.propTypes = {
  classification: PropTypes.shape({
    annotations: MobXPropTypes.observableMap
  }),
  completeClassification: PropTypes.func,
  disabled: PropTypes.bool,
  selectStep: PropTypes.func,
  step: PropTypes.shape({
    isThereANextStep: PropTypes.bool
  }),
  tasks: PropTypes.arrayOf(PropTypes.object)
}

export default observer(TaskNavButtonsContainer)
export { TaskNavButtonsContainer }
