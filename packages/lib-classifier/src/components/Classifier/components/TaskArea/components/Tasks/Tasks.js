import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

import taskRegistry from '@plugins/tasks'
import TaskHelp from './components/TaskHelp'
import TaskNavButtons from './components/TaskNavButtons'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { active: classification, demoMode } = stores.classifierStore.classifications
  const { loadingState } = stores.classifierStore.workflows
  const { active: step, isThereTaskHelp } = stores.classifierStore.workflowSteps
  const { loadingState: subjectReadyState } = stores.classifierStore.subjectViewer
  return {
    classification,
    demoMode,
    isThereTaskHelp,
    loadingState,
    step,
    subjectReadyState,
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
    const { 
      classification,
      demoMode,
      isThereTaskHelp,
      subjectReadyState,
      step,
      theme
    } = this.props

    const ready = subjectReadyState === asyncStates.success
    if (classification && step.tasks.length > 0) {
      // setting the wrapping box of the task component to a basis of 246px feels hacky,
      // but gets the area to be the same 453px height (or very close) as the subject area
      // and keeps the task nav buttons at the the bottom area
      // there has to be a better way
      // but works for now
      return (
        <Box as='form' gap='small' justify='between' fill>
          {step.tasks.map((task) => {
            // classifications.addAnnotation(task, value) retrieves any existing task annotation from the store
            // or creates a new one if one doesn't exist.
            // The name is a bit confusing.
            const annotation = classification.addAnnotation(task)
            task.setAnnotation(annotation)
            const TaskComponent = observer(taskRegistry.get(task.type).TaskComponent)
            if (annotation && TaskComponent) {
              return (
                <Box key={annotation.id} basis='auto'>
                  <TaskComponent
                    {...this.props}
                    disabled={!ready}
                    annotation={annotation}
                    task={task}
                    theme={theme}
                  />
                </Box>
              )
            }

            return (<Paragraph>{counterpart('Tasks.renderFallback')}</Paragraph>)
          })}
          {isThereTaskHelp && <TaskHelp tasks={step.tasks} />}
          <TaskNavButtons disabled={!ready || !step.isComplete} />
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
    const { loadingState } = this.props
    return this[loadingState]() || null
  }
}

Tasks.propTypes = {
  demoMode: PropTypes.bool,
  isThereTaskHelp: PropTypes.bool,
  loadingState: PropTypes.oneOf(asyncStates.values),
  ready: PropTypes.bool
}

Tasks.defaultProps = {
  demoMode: false,
  isThereTaskHelp: false,
  loadingState: asyncStates.initialized,
  ready: false
}

@inject(storeMapper)
@withTheme
@observer
class DecoratedTasks extends Tasks {}

export default DecoratedTasks
export { Tasks }
