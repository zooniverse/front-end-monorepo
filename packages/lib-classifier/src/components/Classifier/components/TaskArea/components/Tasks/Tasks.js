import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'

import getTaskComponent from './helpers/getTaskComponent'
import TaskHelp from './components/TaskHelp'
import TaskNavButtons from './components/TaskNavButtons'

function storeMapper (stores) {
  const { loadingState } = stores.classifierStore.workflows
  const { active: step, activeStepTasks: tasks, isThereTaskHelp } = stores.classifierStore.workflowSteps
  const { loadingState: subjectReadyState } = stores.classifierStore.subjectViewer
  return {
    isThereTaskHelp,
    loadingState,
    step,
    subjectReadyState,
    tasks
  }
}

class Tasks extends React.Component {
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
    const { isThereTaskHelp, subjectReadyState, tasks } = this.props
    const ready = subjectReadyState === asyncStates.success
    if (tasks.length > 0) {
      // setting the wrapping box of the task component to a basis of 246px feels hacky,
      // but gets the area to be the same 453px height (or very close) as the subject area
      // and keeps the task nav buttons at the the bottom area
      // there has to be a better way
      // but works for now
      return (
        <ThemeProvider theme={{ mode: this.props.theme }}>
          <Box as='form' justify='between' fill>
            {tasks.map((task) => {
              const TaskComponent = getTaskComponent(task.type)
              if (TaskComponent) {
                return (
                  <Box key={task.taskKey} basis='auto'>
                    <TaskComponent disabled={!ready} task={task} {...this.props} />
                  </Box>
                )
              }

              return (<Paragraph>Task component could not be rendered.</Paragraph>)
            })}
            {isThereTaskHelp && <TaskHelp tasks={tasks} />}
            <TaskNavButtons disabled={!ready} />
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

Tasks.propTypes = {
  isThereTaskHelp: PropTypes.bool,
  loadingState: PropTypes.oneOf(asyncStates.values),
  ready: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.string
}

Tasks.defaultProps = {
  isThereTaskHelp: false,
  loadingState: asyncStates.initialized,
  ready: false,
  tasks: [],
  theme: 'light'
}

@inject(storeMapper)
@observer
class DecoratedTasks extends Tasks {}

export default DecoratedTasks
export { Tasks }
