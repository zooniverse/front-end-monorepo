import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import DefaultTextTask from './components/DefaultTextTask'
import TextTaskWithSuggestions from './components/TextTaskWithSuggestions'

function TextTask (props) {
  const { autoFocus, disabled, subTaskPreviousAnnotationValues, task } = props
  const { value } = task.annotation

  function updateAnnotation (ref) {
    const currentRef = ref.current
    if (currentRef && task.annotation) {
      const text = currentRef.value
      task.annotation.update(text)
    }
  }

  function setTagSelection (e, ref) {
    const currentRef = ref.current
    const text = currentRef.value
    const textTag = e.currentTarget.value
    const startTag = `[${textTag}]`
    const endTag = `[/${textTag}]`
    const selectionStart = currentRef.selectionStart
    const selectionEnd = currentRef.selectionEnd
    const textBefore = text.substring(0, selectionStart)
    let textAfter
    let newValue

    if (selectionStart === selectionEnd) {
      textAfter = text.substring(selectionStart, text.length)
      newValue = textBefore + startTag + endTag + textAfter
    } else {
      const textInBetween = text.substring(selectionStart, selectionEnd)
      textAfter = text.substring(selectionEnd, text.length)
      newValue = textBefore + startTag + textInBetween + endTag + textAfter
    }

    currentRef.value = newValue
    updateAnnotation(ref)
    if (currentRef.focus) {
      currentRef.setSelectionRange((newValue.length - textAfter.length), (newValue.length - textAfter.length))
      currentRef.focus()
    }
  }

  function onSelectSuggestion (event, ref) {
    const currentRef = ref.current
    currentRef.value = event.suggestion
    updateAnnotation(ref)
  }

  if (subTaskPreviousAnnotationValues && subTaskPreviousAnnotationValues.length > 0) {
    return (
      <TextTaskWithSuggestions
        autoFocus={autoFocus}
        disabled={disabled}
        onSelectSuggestion={onSelectSuggestion}
        setTagSelection={setTagSelection}
        suggestions={subTaskPreviousAnnotationValues}
        task={task}
        value={value}
        updateAnnotation={updateAnnotation}
      />
    )
  }

  return (
    <DefaultTextTask
      autoFocus={autoFocus}
      disabled={disabled}
      setTagSelection={setTagSelection}
      task={task}
      value={value}
      updateAnnotation={updateAnnotation}
    />
  )
}

TextTask.defaultProps = {
  autoFocus: false,
  disabled: false,
  subTaskPreviousAnnotationValues: []
}

TextTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  subTaskPreviousAnnotationValues: PropTypes.array,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    text_tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string
  }).isRequired

}

export default TextTask
