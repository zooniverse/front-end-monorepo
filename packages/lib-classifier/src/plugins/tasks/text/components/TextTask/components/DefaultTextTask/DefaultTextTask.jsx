import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, TextArea } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import styled from 'styled-components'
import TextTagButtons from '../TextTagButtons'

const StyledText = styled(Text)`
  display: block;
  margin: 0 0 10px 0;
`

const StyledTextArea = styled(TextArea)`
  padding: 7px;
`

function DefaultTextTask ({
  autoFocus = false,
  disabled = false,
  setTagSelection = () => true,
  task,
  value,
  updateAnnotation = () => true
}) {
  const textAreaRef = useRef()
  const [rows, setRows] = useState(1)

  /*
    On value change, get the <textarea>'s scrollHeight divided by height of one line
    rounded down to the nearest integar. Without this function, <textarea>'s becomes a
    scrollable container.

    This only works as content is expanding, not if content is backspaced. In the future,
    this resize can be improved with the CSS property `field-sizing` once supported.
  */
  function handleResize() {
    const LINEHEIGHT = 23 // ~1rem + some vertical padding
    const oldRows = rows
    let newRows = textAreaRef.current ? Math.floor(textAreaRef.current.scrollHeight / LINEHEIGHT) : oldRows

    if (newRows !== oldRows) {
      setRows(newRows)
    }
  }

  function onChange() {
    updateAnnotation(textAreaRef)
    handleResize()
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
    span: StyledText
  }

  return (
    <Box
      direction='column'
    >
      <label
        htmlFor={`${task.taskKey}-${task.type}`}
      >
        <Markdownz components={components}>{task.instruction}</Markdownz>
        <StyledTextArea
          ref={textAreaRef}
          autoFocus={autoFocus}
          disabled={disabled}
          id={`${task.taskKey}-${task.type}`}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      </label>
      <TextTagButtons
        disabled={disabled}
        onClick={(event) => setTagSelection(event, textAreaRef)}
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
