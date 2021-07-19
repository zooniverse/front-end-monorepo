import React from 'react'
import PropTypes from 'prop-types'
import { Box, TextInput, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'
import TextTagButtons from '../TextTagButtons'

const StyledText = styled(Text)`
  display: block;
  margin: 10px 0;
`

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
  const dropProps = {
    trapFocus: false
  }

  function onChange() {
    updateAnnotation(textInput)
  }

  const components = {
    a: StyledText,
    h1: StyledText,
    h2: StyledText,
    h3: StyledText,
    h4: StyledText,
    h5: StyledText,
    h6: StyledText,
    p: StyledText,
    span: Text
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
        <Markdownz components={components}>{task.instruction}</Markdownz>
        <TextInput
          autoFocus={autoFocus}
          disabled={disabled}
          dropProps={dropProps}
          id={`${task.taskKey}-${task.type}`}
          onChange={onChange}
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