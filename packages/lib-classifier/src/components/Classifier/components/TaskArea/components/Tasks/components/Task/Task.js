import asyncStates from '@zooniverse/async-states'
import { Box, Paragraph } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import { func, shape, string } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import taskRegistry from '@plugins/tasks'

function useStores(task, stores) {
  const { classifierStore } = stores || useContext(MobXProviderContext)
  const [ annotation, setAnnotation ] = useState(null)

  const {
    classifications,
    subjectViewer
  } = classifierStore
  const { loadingState: subjectReadyState } = subjectViewer
  const classification = classifications.active
  const disabled = subjectReadyState !== asyncStates.success

  function onTaskChange() {
    const taskAnnotation = classification.addAnnotation(task)
    setAnnotation(taskAnnotation)
  }
  useEffect(onTaskChange, [task.taskKey])
  return {
    annotation,
    disabled
  }
}

function Task (props) {
  const { store, task } = props
  const { annotation, disabled } = useStores(task, store)
  const { TaskComponent } = taskRegistry.get(task.type)

  if (annotation && TaskComponent) {
    return (
      <Box key={annotation.id} basis='auto'>
        <TaskComponent
          {...props}
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
    setAnnotation: func.isRequired,
    taskKey: string.isRequired
  }).isRequired
}

export default observer(Task)

