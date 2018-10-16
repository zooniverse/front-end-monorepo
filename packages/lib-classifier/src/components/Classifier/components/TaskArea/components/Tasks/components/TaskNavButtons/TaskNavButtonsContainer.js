import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function storeMapper (stores) {
  const {
    active: step,
    activeStepTasks: tasks,
    isThereANextStep: showNextButton,
    selectStep
  } = stores.classifierStore.workflowSteps
  const { active: classification, createDefaultAnnotation } = stores.classifierStore.classifications

  return {
    classification,
    createDefaultAnnotation,
    showNextButton,
    selectStep,
    step,
    tasks
  }
}

@inject(storeMapper)
@observer
class TaskNavButtonsContainer extends React.Component {
  createDefaultAnnotationIfThereIsNone() {
    const { classification, createDefaultAnnotation, step, tasks } = this.props
    step.taskKeys.forEach((taskKey) => {
      // User didn't submit annotation and task is not required
      // Create the default annotation before going to the next step
      if (!classification.annotations.get(taskKey)) {
        const [task] = tasks.filter((task) => { return task.taskKey === taskKey })
        createDefaultAnnotation(task)
      }
    })
  }

  goToNextStep () {
    const { selectStep } = this.props
    this.createDefaultAnnotationIfThereIsNone()
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
