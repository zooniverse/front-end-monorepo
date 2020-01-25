import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import TaskHelp from './components/TaskHelp'
import TaskNavButtons from './components/TaskNavButtons'

import taskRegistry from '@plugins/tasks'

function storeMapper (stores) {
  const { active: classification, addAnnotation } = stores.classifierStore.classifications
  const { loadingState } = stores.classifierStore.workflows
  const { active: step, activeStepTasks: tasks, isThereTaskHelp } = stores.classifierStore.workflowSteps
  const { loadingState: subjectReadyState } = stores.classifierStore.subjectViewer
  return {
    addAnnotation,
    classification,
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
    const { addAnnotation, classification, isThereTaskHelp, subjectReadyState, step, tasks } = this.props
    const ready = subjectReadyState === asyncStates.success
    if (classification && tasks.length > 0) {
      // setting the wrapping box of the task component to a basis of 246px feels hacky,
      // but gets the area to be the same 453px height (or very close) as the subject area
      // and keeps the task nav buttons at the the bottom area
      // there has to be a better way
      // but works for now
      return (
        <Box as='form' gap='small' justify='between' fill>
          {tasks.map((task) => {
            addAnnotation(task)
            const annotation = classification.annotation(task)
            const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)
            if (annotation && TaskComponent) {
              return (
                <Box key={task.taskKey} basis='auto'>
                  <TaskComponent
                    disabled={!ready}
                    annotation={annotation}
                    task={task}
                    {...this.props}
                  />
                </Box>
              )
            }

            return (<Paragraph>Task component could not be rendered.</Paragraph>)
          })}
          {isThereTaskHelp && <TaskHelp tasks={tasks} />}
          <TaskNavButtons disabled={!ready || !step.isComplete} />
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
  isThereTaskHelp: PropTypes.bool,
  loadingState: PropTypes.oneOf(asyncStates.values),
  ready: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.object)
}

Tasks.defaultProps = {
  isThereTaskHelp: false,
  loadingState: asyncStates.initialized,
  ready: false,
  tasks: []
}

@inject(storeMapper)
@observer
class DecoratedTasks extends Tasks {}

export default DecoratedTasks
export { Tasks }
