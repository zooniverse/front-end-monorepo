import { observer } from 'mobx-react'
import React from 'react'

import TextFromSubjectTask from './TextFromSubjectTask'

function TextFromSubjectContainer ({
  annotation,
  autoFocus,
  disabled,
  task
}) {
  const {
    initializedFromSubject,
    value
  } = annotation

  function updateAnnotation (ref) {
    const currentRef = ref.current
    if (currentRef && annotation) {
      const text = currentRef.value
      annotation.update(text)
    }
  }

  return (
    <TextFromSubjectTask
      autoFocus={autoFocus}
      disabled={disabled || !initializedFromSubject}
      task={task}
      updateAnnotation={updateAnnotation}
      value={value}
    />
  )
}

export default observer(TextFromSubjectContainer)
