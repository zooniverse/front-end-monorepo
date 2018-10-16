import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import TaskNavButtons from './TaskNavButtons'

function storeMapper (stores) {
  const {
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

TaskNavButtonsContainer.propTypes = {
  classification: PropTypes.shape({
    annotation: MobXPropTypes.observableArrayOf(PropTypes.object)
  }),
  createDefaultAnnotation: PropTypes.func,
  showNextButton: PropTypes.bool,
  selectStep: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

export default TaskNavButtonsContainer
