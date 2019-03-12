import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import getTaskComponent from './helpers/getTaskComponent'
import TaskHelp from './components/TaskHelp'
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
        <ThemeProvider theme={{ mode: this.props.theme }}>
          <Box tag='form' pad={{ top: 'medium' }}>
            {tasks.map((task) => {
              const TaskComponent = getTaskComponent(task.type)
              if (TaskComponent) {
                return (
                  <Box key={task.taskKey}>
                    <TaskComponent task={task} {...this.props} />
                    {task.help &&
                      <TaskHelp />}
                  </Box>
                )
              }

              return (<div>Task component could not be rendered.</div>)
            })}
            <TaskNavButtons />
          </Box>
      </ThemeProvider>
      )
    }

    return null
  }

  render () {
    const { loadingState } = this.props
    return this[loadingState]() || null
  }
}

Tasks.wrappedComponent.propTypes = {
  loadingState: PropTypes.oneOf(asyncStates.values),
  tasks: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.string,
}

Tasks.wrappedComponent.defaultProps = {
  loadingState: asyncStates.initialized,
  tasks: [],
  theme: 'light',
}

export default Tasks
