import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'

import InputStatus from '../../../components/InputStatus'
import TaskInput from '../../../components/TaskInput'

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

export default function HighlighterTask ({
  autoFocus = false,
  disabled = false,
  task,
  updateAnnotation = () => true,
  value
}) {
  function onChange (index, event) {
    console.log('onChange')
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
            <TaskInput
              index={index}
              key={`${task.taskKey}_${index}`}
              label={task.strings.get(`highlighterLabels.${index}.label`)}
              labelIcon={
                <StyledLabelColor
                  color={label.color}
                />
              }
              labelStatus={<InputStatus count={index} />}
              name='highlighter-label'
              onChange={(event) => onChange(index, event)}
              required={task.required}
              type='radio'
            />
          )
        }) : <span>No labels for the Highlighter Task</span>
      }
    </Box>
  )
}

HighlighterTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  updateAnnotation: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
    text: PropTypes.string
  }))
}
