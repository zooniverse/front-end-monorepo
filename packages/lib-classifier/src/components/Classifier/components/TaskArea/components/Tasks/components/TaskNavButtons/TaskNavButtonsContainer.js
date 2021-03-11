import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function useStores(store) {
  const { classifierStore } = store || useContext(MobXProviderContext)
  const {
    annotatedSteps,
    classifications,
    workflows,
    workflowSteps
  } = classifierStore
  const {
    active: step,
    activeStepTasks: tasks,
    selectStep
  } = workflowSteps
  const {
    active: classification,
    completeClassification
  } = classifications
  const {
    active: workflow
  } = workflows

  return {
    annotatedSteps,
    classification,
    completeClassification,
    selectStep,
    step,
    tasks,
    workflow
  }
}

function TaskNavButtonsContainer({
  disabled = false,
  store
}) {
  const {
    annotatedSteps,
    classification,
    completeClassification,
    selectStep,
    step,
    tasks,
    workflow
  } = useStores(store)

  const { canUndo, latest } = annotatedSteps

  function completeStepTasks() {
    if (classification) {
      const { annotations } = latest
      tasks.forEach((task) => {
        const [ annotation ] = annotations.filter(annotation => annotation.task === task.taskKey)
        task.complete(annotation)
      })
    }
  }

  function goToPreviousStep() {
    annotatedSteps.back(workflow.configuration.persist_annotations)
  }

  function goToNextStep() {
    completeStepTasks()
    annotatedSteps.next()
  }

  function onSubmit(event) {
    event.preventDefault()
    completeStepTasks()
    annotatedSteps.clearRedo()
    return completeClassification()
  }

  return (
    <TaskNavButtons
      disabled={disabled}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
      showBackButton={canUndo}
      showNextButton={latest.nextStepKey()}
      onSubmit={onSubmit}
    />
  )
}

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
