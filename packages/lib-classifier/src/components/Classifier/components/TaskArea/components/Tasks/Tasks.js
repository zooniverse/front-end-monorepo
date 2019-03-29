import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import getTaskComponent from './helpers/getTaskComponent'
import TaskHelp from './components/TaskHelp'
import { default as TaskNavButtons } from './components/TaskNavButtons'

const StyledBox = styled(Box)`
  min-height: 400px;
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
    return (<Paragraph>Loading</Paragraph>)
  }

  [asyncStates.error] () {
    console.error('There was an error loading the workflow steps and tasks.')
    return (<Paragraph>Something went wrong</Paragraph>)
  }

  [asyncStates.success] () {
    const { tasks } = this.props
    if (tasks.length > 0) {
      return (
        <ThemeProvider theme={{ mode: this.props.theme }}>
          <StyledBox as='form' justify='between' pad={{ top: 'medium' }}>
            {tasks.map((task) => {
              const TaskComponent = getTaskComponent(task.type)
              if (TaskComponent) {
                return (
                  <Box key={task.taskKey}>
                    <TaskComponent task={task} {...this.props} />
                  </Box>
                )
              }

              return (<Paragraph>Task component could not be rendered.</Paragraph>)
            })}
            <TaskHelp />
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
