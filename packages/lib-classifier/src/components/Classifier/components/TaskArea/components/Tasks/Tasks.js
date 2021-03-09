import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import Task from './components/Task'
import TaskHelp from './components/TaskHelp'
import TaskNavButtons from './components/TaskNavButtons'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

function storeMapper({ classifierStore }) {
  const {
    annotatedSteps,
    classifications,
    subjectViewer,
    workflows,
    workflowSteps
  } = classifierStore
  const { active: classification, demoMode } = classifications
  const { loadingState } = workflows
  const { active: step, isThereTaskHelp } = workflowSteps
  const { loadingState: subjectReadyState } = subjectViewer
  const isComplete = annotatedSteps.latest?.isComplete

  return {
    classification,
    demoMode,
    isComplete,
    isThereTaskHelp,
    loadingState,
    step,
    subjectReadyState
  }
}

class Tasks extends React.Component {
  [asyncStates.initialized] () {
    return null
  }

  [asyncStates.loading] () {
    return (<Paragraph>{counterpart('Tasks.loading')}</Paragraph>)
  }

  [asyncStates.error] () {
    console.error('There was an error loading the workflow steps and tasks.')
    return (<Paragraph>{counterpart('Tasks.error')}</Paragraph>)
  }

  [asyncStates.success] () {
    const { classifierStore } = this.context
    const {
      classification,
      demoMode,
      isComplete,
      isThereTaskHelp,
      subjectReadyState,
      step
    } = classifierStore ? storeMapper({ classifierStore }) : this.props
    const ready = subjectReadyState === asyncStates.success
    if (classification && step.tasks.length > 0) {
      // setting the wrapping box of the task component to a basis of 246px feels hacky,
      // but gets the area to be the same 453px height (or very close) as the subject area
      // and keeps the task nav buttons at the the bottom area
      // there has to be a better way
      // but works for now
      return (
        <Box
          key={classification.id}
          as='form'
          gap='small'
          justify='between'
          fill
        >
          {step.tasks.map((task) => (
            <Task
              key={task.taskKey}
              {...this.props}
              task={task}
            />
          ))}
          {isThereTaskHelp && <TaskHelp tasks={step.tasks} />}
          <TaskNavButtons disabled={!ready || !isComplete} />
          {demoMode &&
            <Paragraph>
              {counterpart('Tasks.demoMode')}
            </Paragraph>}
        </Box>
      )
    }

    return null
  }

  render () {
    const { classifierStore } = this.context
    const { loadingState } = classifierStore ? storeMapper({ classifierStore }) : this.props
    return this[loadingState]() || null
  }
}

Tasks.contextType = MobXProviderContext

Tasks.propTypes = {
  demoMode: PropTypes.bool,
  isComplete: PropTypes.bool,
  isThereTaskHelp: PropTypes.bool,
  loadingState: PropTypes.oneOf(asyncStates.values),
  ready: PropTypes.bool
}

Tasks.defaultProps = {
  demoMode: false,
  isComplete: false,
  isThereTaskHelp: false,
  loadingState: asyncStates.initialized,
  ready: false
}

export default observer(Tasks)
export { Tasks }
