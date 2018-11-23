import zooTheme from '@zooniverse/grommet-theme'
import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import theme from 'styled-theming'

import getTaskComponent from './helpers/getTaskComponent'
import TaskHelpButton from './components/TaskHelpButton'
import { default as TaskNavButtons } from './components/TaskNavButtons'

const StyledBox = styled(Box)`
  border-bottom: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${theme('mode', {
    dark: zooTheme.dark.colors.tabs.border,
    light: zooTheme.light.colors.tabs.border
  })};
`

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
          <StyledBox tag='form' pad={{ top: 'medium' }}>
            {tasks.map((task) => {
              const TaskComponent = getTaskComponent(task.type)
              if (TaskComponent) {
                return (
                  <Box key={task.taskKey}>
                    <TaskComponent task={task} {...this.props} />
                    {task.help &&
                      <TaskHelpButton />}
                  </Box>
                )
              }

              return (<div>Task component could not be rendered.</div>)
            })}
            <TaskNavButtons />
          </StyledBox>
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
