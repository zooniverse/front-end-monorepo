import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import { useSubjectText } from '@hooks'
import TextFromSubjectTask from './TextFromSubjectTask'

function TextFromSubjectContainer ({
  annotation,
  autoFocus = false,
  disabled = true,
  subject,
  task
}) {
  const {
    initializedFromSubject,
    value
  } = annotation

  let textDataLoadingState = asyncStates.initialized

  const { data: textData, loading, error } = useSubjectText({ subject })
  if (!loading && textData) {
    textDataLoadingState = asyncStates.success
  }
  if (!loading && error) {
    textDataLoadingState = asyncStates.error
    console.error(error)
  }

  function updateAnnotation (ref) {
    const currentRef = ref.current
    if (currentRef && annotation) {
      const text = currentRef.value
      annotation.update(text)
    }
  }

  function resetToSubject () {
    annotation.update(textData)
  }

  if (!initializedFromSubject && textDataLoadingState === asyncStates.success) {
    annotation.updateFromSubject(textData)
  }

  const isChanged = initializedFromSubject && value !== textData

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

TextFromSubjectContainer.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.string
  }).isRequired,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  subject: PropTypes.shape({
    id: PropTypes.string
  }).isRequired,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}

export default observer(TextFromSubjectContainer)
