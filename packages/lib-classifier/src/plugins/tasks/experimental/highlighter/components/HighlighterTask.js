import { Box, Button, Text } from 'grommet'
import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'

import extraNewLineCharacter from './helpers/extraNewLineCharacter'
import getOffset from './helpers/getOffset'
import selectableArea from './helpers/selectableArea'

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

const StyledLabelColor = styled.span`
  align-self: center;
  background-color: ${props => props.color};
  border-radius: 3px;
  height: 1.8em;
  margin: 0 .8em;
  width: 2.4em;
`

export function StyledButtonLabel ({ color, label }) {
  return (
    <Box as='span'>
      <StyledLabelColor color={color} />
      <span>{label}</span>
    </Box>
  )
}

export function HighlighterTask ({
  annotation,
  autoFocus = false,
  disabled = false,
  task
}) {
  function createLabelAnnotation(selection, labelIndex) {
    // currently we only deal with one selection at a time
    const range = selection.getRangeAt(0)
    const offset = getOffset(selection)
    const start = offset + range.startOffset
    const endOffset = extraNewLineCharacter(range)
    const end = offset + endOffset
    const labelInformation = getSnapshot(task.highlighterLabels[labelIndex])
    const selectable = selectableArea(selection, range, offset, start, end)
    
    if (selectable) {
      const newValue = Array.from(annotation.value)
      newValue.push({
        labelInformation,
        start,
        end,
        text: range.toString()
      })
      console.log('new annotation value', newValue)
      annotation.update(newValue)
    }

    selection.collapseToEnd()
  }

  function handleClick (event, index) {
    const selection = document.getSelection()
    createLabelAnnotation(selection, index)
  }

  // TODO add labelCount for InputStatus per annotation.value
  // TODO translate "No labels for the Highlighter Task"

  return (
    <Box
      direction='column'
    >
      <StyledText as='legend' size='small'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>
      {task.highlighterLabels ? 
        task.highlighterLabels.map((label, index) => {
          return (
            <Button
              key={`${task.taskKey}_${index}`}
              label={<StyledButtonLabel color={label.color} label={task.strings.get(`highlighterLabels.${index}.label`)} />}
              name='highlighter-label'
              onClick={(event) => handleClick(event, index)}
            />
          )
        }) : <span>No labels for the Highlighter Task</span>
      }
    </Box>
  )
}

HighlighterTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.array,
  }).isRequired,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
}

export default observer(HighlighterTask)
