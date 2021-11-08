import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import Task from './components/Task'
import TaskHelp from './components/TaskHelp'
import TaskNavButtons from './components/TaskNavButtons'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

/**
The classifier tasks area. It displays tasks for the active step, along with task help (if any) and navigation buttons to go to the next/previous step, or submit the classification.
*/
export default function Tasks({
  classification,
  demoMode = false,
  disabled = false,
  isComplete = false,
  isThereTaskHelp = false,
  loadingState = asyncStates.initialized,
  subjectReadyState,
  step
}) {
  switch (loadingState) {
    case asyncStates.initialized: {
      return null
    }
    case asyncStates.loading: {
      return (<Paragraph>{counterpart('Tasks.loading')}</Paragraph>)
    }
    case asyncStates.error: {
      console.error('There was an error loading the workflow steps and tasks.')
      return (<Paragraph>{counterpart('Tasks.error')}</Paragraph>)
    }
    case asyncStates.success: {
      const ready = subjectReadyState === asyncStates.success
      if (classification && step) {
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
            {step.tasks.map((task,index) => (
              <Task
                autoFocus={index === 0}
                disabled={disabled || !ready}
                key={task.taskKey}
                task={task}
              />
            ))}
            {isThereTaskHelp && <TaskHelp disabled={disabled} tasks={step.tasks} />}
            <TaskNavButtons disabled={disabled || !ready || !isComplete} />
            {demoMode &&
              <Paragraph>
                {counterpart('Tasks.demoMode')}
              </Paragraph>}
          </Box>
        )
      }

      return null
    }
    default: {
      return null
    }
  }
}

Tasks.propTypes = {
  /** Enable demo mode and turn off classification submission  */
  demoMode: PropTypes.bool,
  /** disable the entire task area */
  disabled: PropTypes.bool,
  /** Are these tasks complete, so that we can go to the next step. */
  isComplete: PropTypes.bool,
   /** show a help button for these tasks */
  isThereTaskHelp: PropTypes.bool,
  /** The workflow loading state */
  loadingState: PropTypes.oneOf(asyncStates.values),
  /** Subject loading state. */
  subjectReadyState: PropTypes.oneOf(asyncStates.values),
  /** The active workflow step. */
  step: PropTypes.shape({
    /** The step's tasks. */
    tasks: PropTypes.array
  })
}
