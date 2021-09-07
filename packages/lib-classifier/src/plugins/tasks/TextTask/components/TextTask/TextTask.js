import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import DefaultTextTask from './components/DefaultTextTask'
import TextTaskWithSuggestions from './components/TextTaskWithSuggestions'

/*
Special case: literal insertion tags
 */
const literalInsertionTags = ['&']

function TextTask (props) {
  const { annotation, autoFocus, disabled, subTaskPreviousAnnotationValues, task } = props
  const { value } = annotation

  function updateAnnotation (ref) {
    const currentRef = ref.current
    if (currentRef && annotation) {
      const text = currentRef.value
      annotation.update(text)
    }
  }

  function setTagSelection (e, ref) {
    const currentRef = ref.current
    const text = currentRef.value
    const textTag = e.currentTarget.value
    
    // Special case: literal insertion tags
    if (literalInsertionTags.indexOf(textTag) >= 0) {
      return setTagSelection_literalInsertion(e, ref)
    }
    
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
  
  /*
  Special case: literal insertion tags
  - For certain tags, we insert them individually, as is, with no brackets.
  - i.e. 'tag' instead of '[tag]...[/tag]'
  - Requested for Davy Notebooks on Aug 2021: https://github.com/zooniverse/front-end-monorepo/issues/2331
  - This is a temporary measure. Long term solution is to create a new category of text tags.
 */
  function setTagSelection_literalInsertion (e, ref) {
    const currentRef = ref.current
    const text = currentRef.value
    const textTag = e.currentTarget.value
    const selectionStart = currentRef.selectionStart
    const selectionEnd = currentRef.selectionEnd
    const textBefore = text.substring(0, selectionStart)
    const textAfter = text.substring(selectionEnd, text.length)
    const newValue = textBefore + textTag + textAfter

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

export default observer(TextTask)
