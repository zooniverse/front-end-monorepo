import { Box, Paragraph } from 'grommet'
import { bool, func, shape } from 'prop-types'
import React, { useEffect, useState } from 'react'

import taskRegistry from '@plugins/tasks'

export default function Task (props) {
  const { classification, disabled, task } = props
  const [ annotation, setAnnotation ] = useState()
  const { TaskComponent } = taskRegistry.get(task.type)

  useEffect(function onMount() {
    const annotation = classification.addAnnotation(task)
    task.setAnnotation(annotation)
    setAnnotation(annotation)
  }, [])

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
  classification: shape({
    addAnnotation: func.isRequired
  }).isRequired,
  disabled: bool,
  task: shape({
    setAnnotation: func.isRequired
  }).isRequired
}

Task.defaultProps = {
  disabled: false
}
