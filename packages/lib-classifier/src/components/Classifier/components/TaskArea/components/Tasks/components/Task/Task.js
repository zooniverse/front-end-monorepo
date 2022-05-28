import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { array, bool, object, shape, string } from 'prop-types'
import React, { useContext } from 'react'

import { withStores } from '@helpers'
import * as tasks from '@plugins/tasks'

function storeMapper(classifierStore) {
  const {
    subjects: {
      active: subject
    },
    subjectViewer: {
      loadingState: subjectReadyState
    }
  } = classifierStore

  const disabled = subjectReadyState !== asyncStates.success
  const latest = subject?.stepHistory.latest

  return {
    disabled,
    latest
  }
}

function Task ({
  autoFocus = false,
  disabled = false,
  latest,
  previousAnnotationValues = null,
  task,
  ...props
}) {
  const { TaskComponent } = task.type === 'dropdown-simple'? tasks.dropdownSimple : tasks[task.type]
  let annotation
  let suggestions

  if (latest) {
    ([ annotation ] = latest.annotations.filter(annotation => annotation.task === task.taskKey))
  }

  if (previousAnnotationValues) {
    suggestions = previousAnnotationValues.get(task.taskKey)
  }
  
  if (!annotation) {
    return <Paragraph>Annotation missing for task <code>{task.taskKey}</code></Paragraph>
  }

  if (!TaskComponent) {
    return (<Paragraph>Task component could not be rendered.</Paragraph>)
  }

  return (
    <Box key={annotation.id} basis='auto'>
      <TaskComponent
        {...props}
        autoFocus={autoFocus}
        disabled={disabled}
        annotation={annotation}
        suggestions={suggestions}
        task={task}
      />
    </Box>
  )
}

Task.propTypes = {
  autoFocus: bool,
  disabled: bool,
  latest: shape({
    annotations: array
  }),
  previousAnnotationValues: object,
  task: shape({
    taskKey: string.isRequired
  }).isRequired
}

export default withStores(Task, storeMapper)

