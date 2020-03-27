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
        task={task}
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
          ref={textInput}
          value={value}
        />
      </label>
    </Box>
  )
}