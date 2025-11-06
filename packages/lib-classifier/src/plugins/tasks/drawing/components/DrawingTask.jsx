import { Box, Text } from 'grommet'
import { Blank } from 'grommet-icons'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import getIcon from './helpers/getIcon'
import InputIcon from '../../components/InputIcon'
import InputStatus from '../../components/InputStatus'
import TaskInput from '../../components/TaskInput'

const ToolIcon = ({ type }) => {
  const Icon = getIcon(type)
  return (
    <Blank viewBox='0 0 100 100'>
      <Icon />
    </Blank>
  )
}

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`
function DrawingTask({
  disabled = false,
  task
}) {
  const { setActiveTool } = task
  function onChange(index, event) {
    if (event.target.checked) {
      setActiveTool(index)
    }
  }

  return (
    <Box>
      <StyledText as='legend' size='small'>
        <Markdownz>{task.instruction}</Markdownz>
      </StyledText>

      {task.tools.map((tool, index) => {
        const checked = task.activeToolIndex === index
        return (
          <TaskInput
            checked={checked}
            disabled={disabled}
            index={index}
            key={`${task.taskKey}_${index}`}
            label={task.strings.get(`tools.${index}.label`)}
            labelIcon={
              <InputIcon
                icon={<ToolIcon type={tool.type} />}
                color={tool.color}
              />
            }
            labelStatus={<InputStatus count={tool.marks.size} tool={tool} />}
            name='drawing-tool'
            onChange={(event) => onChange(index, event)}
            required={task.required}
            type='radio'
          />
        )
      })}
    </Box>
  )
}

DrawingTask.propTypes = {
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    setActiveTool: PropTypes.func
  }).isRequired
}

export default observer(DrawingTask)
