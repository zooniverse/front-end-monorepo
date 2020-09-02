import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, TextArea } from 'grommet'
import TextTagButtons from '../TextTagButtons'

export default function DefaultTextTask (props) {
  const {
    autoFocus,
    disabled,
    setTagSelection,
    task,
    value,
    updateAnnotation
  } = props

  const textArea = React.useRef()
  useEffect(onMount, [])

  function onUnmount() {
    updateAnnotation(textArea)
  }

  function onMount() {
    updateAnnotation(textArea)
    return onUnmount
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
          onChange={() => updateAnnotation(textArea)}
        />
      </label>
      <TextTagButtons
        disabled={disabled}
        onClick={(event) => setTagSelection(event, textArea)}
        taskKey={task.taskKey}
        tags={task.text_tags}
      />
    </Box>
  )
}

DefaultTextTask.defaultProps = {
  autoFocus: false,
  disabled: false,
  onSelectSuggestion: () => {},
  setTagSelection: () => {},
  updateAnnotation: () => {}
}

DefaultTextTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelectSuggestion: PropTypes.func,
  setTagSelection: PropTypes.func,
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