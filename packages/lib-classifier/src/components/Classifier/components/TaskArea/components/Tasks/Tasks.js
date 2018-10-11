import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import asyncStates from '@zooniverse/async-states'
import getTaskComponent from './helpers/getTaskComponent'

function storeMapper (stores) {
  const { loadingState } = stores.classifierStore.workflows
  const { active: step } = stores.classifierStore.workflowSteps
  const tasks = stores.classifierStore.workflowSteps.activeStepTasks
  return {
    loadingState,
    step,
    tasks
  }
}

@inject(storeMapper)
@observer
export class Tasks extends React.Component {
  [asyncStates.initialized] () {
    return null
  }

  [asyncStates.loading] () {
    return (<div>Loading</div>)
  }

  [asyncStates.error] () {
    console.error('There was an error loading the workflow steps and tasks.')
    return (<div>Something went wrong</div>)
  }

  [asyncStates.success] () {
    const { tasks } = this.props
    if (tasks.length > 0) {
      return tasks.map((task) => {
        const TaskComponent = getTaskComponent(task.type)
        return <TaskComponent key={task.taskKey} task={task} {...this.props} />
      })
    }

    return null
  }

  render () {
    const { loadingState } = this.props
    return this[loadingState]() || null
  }
}

Tasks.propTypes = {
  loadingState: PropTypes.oneOf(asyncStates.values),
  tasks: PropTypes.arrayOf(PropTypes.object)
}

Tasks.defaultProps = {
  loadingState: asyncStates.initialized,
  tasks: []
}

export default Tasks
