import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'

import Task from './components/Task'
import TaskHelp from './components/TaskHelp'
import TaskNavButtons from './components/TaskNavButtons'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

function withStores(Component) {
  function TasksConnector(props) {
    const { classifierStore } = useContext(MobXProviderContext)
    const {
      annotatedSteps: {
        latest
      },
      classifications: {
        active: classification,
        demoMode
      },
      subjectViewer: {
        loadingState: subjectReadyState
      },
      workflows: {
        loadingState
      },
      workflowSteps: {
        active: step,
        isThereTaskHelp
      }
    } = classifierStore

    let isComplete
    // wait for the step and the classification before calculating isComplete from annotations.
    if (step && classification) {
      isComplete = step.isComplete(latest.annotations)
    }

    return (
      <Component
        classification={classification}
        demoMode={demoMode}
        isComplete={isComplete}
        isThereTaskHelp={isThereTaskHelp}
        loadingState={loadingState}
        step={step}
        subjectReadyState={subjectReadyState}
        {...props}
      />
    )
  }
  return observer(TasksConnector)
}

/**
The classifier tasks arewa. It displays tasks for the active step, along with task help (if any) and navigation buttons to go to the next/previous step, or submit the classification.
*/
function Tasks({
  classification,
  /** Enable demo mode and turn off classification submission  */
  demoMode = false,
  /** Are these tasks complete, so that we can go to the next step. */
  isComplete = false,
  /** show a help button for these tasks */
  isThereTaskHelp = false,
  /** The workflow loading state */
  loadingState = asyncStates.initialized,
  /** Subject loading state. */
  subjectReadyState,
  /** The active workflow step. */
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
                key={task.taskKey}
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
    default: {
      return null
    }
  }
}

Tasks.propTypes = {
  demoMode: PropTypes.bool,
  isComplete: PropTypes.bool,
  isThereTaskHelp: PropTypes.bool,
  loadingState: PropTypes.oneOf(asyncStates.values),
  ready: PropTypes.bool
}

export default withStores(Tasks)
export { Tasks }
