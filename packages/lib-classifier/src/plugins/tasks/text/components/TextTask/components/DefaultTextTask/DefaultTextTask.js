import { observer } from 'mobx-react'
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, TextArea } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'
import TextTagButtons from '../TextTagButtons'

const StyledText = styled(Text)`
  display: block;
  margin: 10px 0;
`

function DefaultTextTask ({
  autoFocus = false,
  disabled = false,
  setTagSelection = () => true,
  task,
  value,
  updateAnnotation = () => true
}) {
  const textArea = React.useRef()

  function onChange() {
    updateAnnotation(textArea)
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
      <label
        htmlFor={`${task.taskKey}-${task.type}`}
      >
        <Markdownz components={components}>{task.instruction}</Markdownz>
        <TextArea
          ref={textArea}
          autoFocus={autoFocus}
          disabled={disabled}
          id={`${task.taskKey}-${task.type}`}
          value={value}
          onChange={onChange}
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

export default observer(DefaultTextTask)
