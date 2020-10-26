import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, TextInput } from 'grommet'
import TextTagButtons from '../TextTagButtons'

export default function TextTaskWithSuggestions (props) {
  const {
    autoFocus,
    disabled,
    onSelectSuggestion,
    setTagSelection,
    suggestions,
    task,
    value,
    updateAnnotation
  } = props

  const textInput = React.useRef()
  useEffect(onMount, [])

  function onUnmount () {
    updateAnnotation(textInput)
  }

  function onMount () {
    updateAnnotation(textInput)
    return onUnmount
  }

  return (
    <Box
      direction='column'
    >
      <TextTagButtons
        disabled={disabled}
        onClick={(event) => setTagSelection(event, textInput)}
        taskKey={task.taskKey}
        tags={task.text_tags}
      />
      <label
        htmlFor={`${task.taskKey}-${task.type}`}
      >
        <Text>{task.instruction}</Text>
        <TextInput
          autoFocus={autoFocus}
          disabled={disabled}
          id={`${task.taskKey}-${task.type}`}
          onChange={() => updateAnnotation(textInput)}
          onSelect={(event) => onSelectSuggestion(event, textInput)}
          suggestions={suggestions}
          ref={textInput}
          value={value}
        />
      </label>
    </Box>
  )
}

TextTaskWithSuggestions.defaultProps = {
  autoFocus: false,
  disabled: false,
  onSelectSuggestion: () => {},
  setTagSelection: () => {},
  suggestions: [],
  updateAnnotation: () => {}
}

TextTaskWithSuggestions.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelectSuggestion: PropTypes.func,
  setTagSelection: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    text_tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string
  }).isRequired,
  value: PropTypes.string.isRequired,
  updateAnnotation: PropTypes.func
}