import { PlainButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Text, TextArea } from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function TextTask (props) {
  const { autoFocus, disabled, task } = props
  const { value } = task.annotation
  const textArea = React.useRef()

  useEffect(onMount, [])

  function updateAnnotation () {
    if (textArea.current && task.annotation) {
      const text = textArea.current.value
      task.annotation.update(text)
    }
  }

  function onUnmount () {
    updateAnnotation()
  }

  function onMount () {
    updateAnnotation()
    return onUnmount
  }

  function setTagSelection (e) {
    const text = textArea.current.value
    const textTag = e.currentTarget.value
    const startTag = `[${textTag}]`
    const endTag = `[/${textTag}]`
    const selectionStart = textArea.current.selectionStart
    const selectionEnd = textArea.current.selectionEnd
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

    textArea.current.value = newValue
    updateAnnotation()
    if (textArea.current.focus) {
      textArea.current.setSelectionRange((newValue.length - textAfter.length), (newValue.length - textAfter.length))
      textArea.current.focus()
    }
  }

  return (
    <Box
      direction='column'
    >
      <label
        htmlFor={`${task.taskKey}-${task.type}`}
      >
        <Text>{task.instruction}</Text>
        <TextArea
          ref={textArea}
          autoFocus={autoFocus}
          disabled={disabled}
          id={`${task.taskKey}-${task.type}`}
          value={value}
          onChange={updateAnnotation}
        />
      </label>
      {(task.text_tags.length > 0) &&
        <Text
          id={`textModifiers-${task.taskKey}`}
          weight='bold'
        >
          {counterpart('TextTask.modifiers')}
        </Text>
      }
      <Box
        gap='small'
        justify='start'
        direction='row'
      >
        {task.text_tags.map(tag => (
          <PlainButton
            aria-labelledby={`textModifiers-${task.taskKey} ${task.taskKey}-${tag}`}
            id={`${task.taskKey}-${tag}`}
            key={tag}
            disabled={disabled}
            justify='start'
            onClick={setTagSelection}
            text={tag}
            value={tag}
          />
        ))}
      </Box>
    </Box>
  )
}

TextTask.defaultProps = {
  autoFocus: false,
  disabled: false
}

TextTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    text_tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

export default TextTask
