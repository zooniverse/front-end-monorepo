import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function withStores(Component) {
  function TaskNavButtonsConnector(props) {
    const { classifierStore } = props.store || useContext(MobXProviderContext)
    const {
      annotatedSteps:{
        back,
        canUndo,
        clearRedo,
        hasNextStep,
        latest: {
          annotations
        },
        next
      },
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
        annotations={annotations}
        back={back}
        canUndo={canUndo}
        classification={classification}
        clearRedo={clearRedo}
        completeClassification={completeClassification}
        hasNextStep={hasNextStep}
        next={next}
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
  annotations,
  back,
  canUndo,
  classification,
  clearRedo,
  completeClassification,
  disabled = false,
  hasNextStep,
  next,
  selectStep,
  step,
  tasks,
  workflow
}) {
  function completeStepTasks() {
    if (classification) {
      tasks.forEach((task) => {
        const [ annotation ] = annotations.filter(annotation => annotation.task === task.taskKey)
        task.complete(annotation)
      })
    }
  }

  function goToPreviousStep() {
    back(workflow.configuration.persist_annotations)
  }

  function goToNextStep() {
    completeStepTasks()
    next()
  }

  function onSubmit(event) {
    event.preventDefault()
    completeStepTasks()
    clearRedo()
    return completeClassification()
  }

  return (
    <TaskNavButtons
      disabled={disabled}
      goToNextStep={goToNextStep}
      goToPreviousStep={goToPreviousStep}
      showBackButton={canUndo}
      showNextButton={hasNextStep}
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
