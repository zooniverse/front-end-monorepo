import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function withStores(Component) {
  function TaskNavButtonsConnector(props) {
    const { classifierStore } = props.store || useContext(MobXProviderContext)
    const {
      annotatedSteps,
      classifications: {
        active: classification,
        completeClassification
      },
      workflows: {
        active: workflow
      },
      workflowSteps: {
        active: step,
        activeStepTasks: tasks,
        selectStep
      }
    } = classifierStore

    return (
      <Component
        annotatedSteps={annotatedSteps}
        classification={classification}
        completeClassification={completeClassification}
        selectStep={selectStep}
        step={step}
        tasks={tasks}
        workflow={workflow}
        {...props}
      />
    )
  }
  return observer(TaskNavButtonsConnector)
}

function TaskNavButtonsContainer({
  annotatedSteps,
  classification,
  disabled = false,
  completeClassification,
  selectStep,
  step,
  tasks,
  workflow
}) {
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

export default withStores(TaskNavButtonsContainer)
export { TaskNavButtonsContainer }
