import { Box, Text, TextArea } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'

const StyledText = styled(Text)`
  display: block;
  margin: 10px 0;
`

export default function TextFromSubjectTask (props) {
  const {
    autoFocus,
    disabled,
    task,
    value,
    updateAnnotation
  } = props

  const textArea = React.useRef()

  function onChange () {
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
    </Box>
  )
}

// TODO: add rows prop as follows to expand rows based on provided text
// rows={value?.split(/\r\n|\r|\n/).length + 1}

TextFromSubjectTask.defaultProps = {
  autoFocus: false,
  disabled: false,
  updateAnnotation: () => {}
}

TextFromSubjectTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    text_tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string
  }).isRequired,
  updateAnnotation: PropTypes.func,
  value: PropTypes.string.isRequired
}
