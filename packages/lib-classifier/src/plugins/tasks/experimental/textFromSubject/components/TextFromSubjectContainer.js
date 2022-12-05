import { observer } from 'mobx-react'

import TextFromSubjectTask from './TextFromSubjectTask'

function TextFromSubjectContainer ({
  annotation,
  autoFocus,
  disabled,
  task
}) {
  const {
    initializedFromSubject,
    isChanged,
    resetToSubject,
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
      isChanged={isChanged}
      resetToSubject={resetToSubject}
      task={task}
      updateAnnotation={updateAnnotation}
      value={value}
    />
  )
}

export default observer(TextFromSubjectContainer)
