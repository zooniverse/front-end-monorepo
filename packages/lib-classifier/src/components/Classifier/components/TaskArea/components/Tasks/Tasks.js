import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { Box } from 'grommet'

import asyncStates from '@zooniverse/async-states'
import getTaskComponent from './helpers/getTaskComponent'
import TaskHelpButton from './components/TaskHelpButton'
import { default as TaskNavButtons } from './components/TaskNavButtons'

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
      return (
        <Box tag='form'>
          {tasks.map((task) => {
            const TaskComponent = getTaskComponent(task.type)
            return (
              <Box key={task.taskKey}>
                <TaskComponent task={task} {...this.props} />
                {task.help &&
                  <TaskHelpButton />}
              </Box>
            )
          })}
          <TaskNavButtons />
        </Box>
      )
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
