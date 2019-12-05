import { Box, Text } from 'grommet'
import { Blank } from 'grommet-icons'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
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
@observer
class DrawingTask extends React.Component {
  onChange (index, event) {
    const { setActiveTool } = this.props.task
    if (event.target.checked) {
      setActiveTool(index)
    }
  }

  render () {
    const { task } = this.props
    return (
      <Box>
        <StyledText size='small' tag='legend'>
          <Markdownz>
            {task.instruction}
          </Markdownz>
        </StyledText>

        {task.tools.map((tool, index) => {
          const checked = task.activeToolIndex === index
          // TODO add count for min/max
          return (
            <TaskInput
              checked={checked}
              disabled={tool.disabled}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={tool.label}
              labelIcon={<InputIcon icon={<ToolIcon type={tool.type} />} tool={tool} />}
              labelStatus={<InputStatus count={tool.marks.size} tool={tool} />}
              name='drawing-tool'
              onChange={this.onChange.bind(this, index)}
              required={task.required}
              type='radio'
            />
          )
        })}
      </Box>
    )
  }
}

DrawingTask.defaultProps = {
  annotations: observable.map(),
  task: {}
}

DrawingTask.propTypes = {
  annotations: MobXPropTypes.observableMap,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool
  })
}

export default DrawingTask
