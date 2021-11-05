import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import { shape, string } from 'prop-types'
import React, { useContext } from 'react'

import taskRegistry from '@plugins/tasks'

function withStores(Component) {
  function TaskConnector({
    store,
    task,
    ...props
  }) {
    const { classifierStore } = store || useContext(MobXProviderContext)

    const {
      subjects: {
        active: subject
      },
      subjectViewer
    } = classifierStore
    const { loadingState: subjectReadyState } = subjectViewer
    const disabled = subjectReadyState !== asyncStates.success

    let annotation
    const latest = subject?.stepHistory.latest
    if (latest) {
      ([ annotation ] = latest.annotations.filter(annotation => annotation.task === task.taskKey))
    }
    if (!annotation) {
      console.log(`annotation missing for ${task.taskKey}`)
    }

    return (
      <Component
        annotation={annotation}
        disabled={disabled}
        task={task}
        {...props}
      />
    )
  }
  return observer(TaskConnector)
}

function Task ({
  annotation,
  autoFocus = false,
  disabled,
  task,
  ...props
}) {
  const { TaskComponent } = taskRegistry.get(task.type)

  if (annotation && TaskComponent) {
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

  return (<Paragraph>Task component could not be rendered.</Paragraph>)
}

Task.propTypes = {
  task: shape({
    taskKey: string.isRequired
  }).isRequired
}

export default withStores(Task)

