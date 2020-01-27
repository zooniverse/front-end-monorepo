import { PlainButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Box, Text, TextArea } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function TextTask (props) {
  const { annotation, autoFocus, disabled, task } = props
  const { value } = annotation
  const textArea = React.createRef()

  function onChange (event) {
    const { target } = event
    updateText(target.value)
  }

  function updateText (text) {
    annotation.update(text)
  }

  function setTagSelection (e) {
    const textTag = e.currentTarget.value
    const startTag = `[${textTag}]`
    const endTag = `[/${textTag}]`
    const selectionStart = textArea.current.selectionStart
    const selectionEnd = textArea.current.selectionEnd
    const textBefore = value.substring(0, selectionStart)
    let textAfter
    let newValue

    if (selectionStart === selectionEnd) {
      textAfter = value.substring(selectionStart, value.length)
      newValue = textBefore + startTag + endTag + textAfter
    } else {
      const textInBetween = value.substring(selectionStart, selectionEnd)
      textAfter = value.substring(selectionEnd, value.length)
      newValue = textBefore + startTag + textInBetween + endTag + textAfter
    }
    updateText(newValue)
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
          onChange={onChange}
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
  className: '',
  disabled: false
}

TextTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.string
  }).isRequired,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    text_tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

export default TextTask
