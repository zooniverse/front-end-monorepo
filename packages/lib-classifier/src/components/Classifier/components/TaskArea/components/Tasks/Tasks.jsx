import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { array, bool, object, oneOf, shape, string } from 'prop-types'
import { useTranslation } from '@translations/i18n'

import Task from './components/Task'
import TaskHelp from './components/TaskHelp'
import TaskNavButtons from './components/TaskNavButtons'

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
  previousAnnotationValues = null,
  subjectReadyState,
  step
}) {

  const { t } = useTranslation('components')

  switch (loadingState) {
    case asyncStates.initialized: {
      return null
    }
    case asyncStates.loading: {
      return (<Paragraph>{t('TaskArea.Tasks.loading')}</Paragraph>)
    }
    case asyncStates.error: {
      console.error('There was an error loading the workflow steps and tasks.')
      return (<Paragraph>{t('TaskArea.Tasks.error')}</Paragraph>)
    }
    case asyncStates.success: {
      const ready = subjectReadyState === asyncStates.success
      if (classification && step) {
        return (
          <Box
            key={classification.id}
            as='form'
            gap='small'
            justify='between'
            fill
          >
            {step.tasks.map((task, index) => (
              <Task
                autoFocus={index === 0}
                disabled={disabled || !ready}
                key={task.taskKey}
                previousAnnotationValues={previousAnnotationValues}
                task={task}
              />
            ))}
            {isThereTaskHelp && <TaskHelp disabled={disabled} tasks={step.tasks} />}
            <TaskNavButtons disabled={disabled || !ready || !isComplete} />
            {demoMode &&
              <Paragraph>
                {t('TaskArea.Tasks.demoMode')}
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
  classification: shape({
    id: string
  }),
  /** Enable demo mode and turn off classification submission  */
  demoMode: bool,
  /** disable the entire task area */
  disabled: bool,
  /** Are these tasks complete, so that we can go to the next step. */
  isComplete: bool,
  /** show a help button for these tasks */
  isThereTaskHelp: bool,
  /** The workflow loading state */
  loadingState: oneOf(asyncStates.values),
  /** A map of previous annotation values for the step's tasks. */
  previousAnnotationValues: object,
  /** Subject loading state. */
  subjectReadyState: oneOf(asyncStates.values),
  /** The active workflow step. */
  step: shape({
    /** The step's tasks. */
    tasks: array
  })
}
