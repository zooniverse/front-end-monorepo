import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { array, bool, shape, string } from 'prop-types'
import React, { useContext } from 'react'

import { withStores } from '@helpers'
import taskRegistry from '@plugins/tasks'

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
  task,
  ...props
}) {
  const { TaskComponent } = taskRegistry.get(task.type)
  let annotation

  if (latest) {
    ([ annotation ] = latest.annotations.filter(annotation => annotation.task === task.taskKey))
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
  task: shape({
    taskKey: string.isRequired
  }).isRequired
}

export default withStores(Task, storeMapper)

