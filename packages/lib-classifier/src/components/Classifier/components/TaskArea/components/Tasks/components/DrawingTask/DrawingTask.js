import { Box, Text } from 'grommet'
import { Blank } from 'grommet-icons'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import getIcon from './helpers/getIcon'
import InputIcon from '../InputIcon'
import InputStatus from '../InputStatus'
import TaskInput from '../TaskInput'

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

function storeMapper (stores) {
  const { active, setActive } = stores.classifierStore.drawing
  return {
    active,
    setActive
  }
}

@inject(storeMapper)
@observer
class DrawingTask extends React.Component {
  onChange (index, event) {
    const { setActive } = this.props
    if (event.target.checked) {
      setActive(index)
    }
  }

  render () {
    const {
      active,
      task
    } = this.props
    return (
      <Box>
        <StyledText size='small' tag='legend'>
          <Markdownz>
            {task.instruction}
          </Markdownz>
        </StyledText>

        {task.tools.map((tool, index) => {
          const checked = active === index
          // TODO add count for min/max
          return (
            <TaskInput
              checked={checked}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={tool.label}
              labelIcon={<InputIcon icon={<ToolIcon type={tool.type} />} tool={tool} />}
              labelStatus={<InputStatus tool={tool} />}
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

DrawingTask.wrappedComponent.defaultProps = {
  annotations: observable.map(),
  task: {}
}

DrawingTask.wrappedComponent.propTypes = {
  annotations: MobXPropTypes.observableMap,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool
  })
}

export default DrawingTask
