import { Text } from 'grommet'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import icons from './icons'
import InputIcon from '../InputIcon'
import InputStatus from '../InputStatus'
import TaskInputField from '../TaskInputField'

export const StyledFieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
`

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

function storeMapper (stores) {
  const annotations = stores.classifierStore.classifications.currentAnnotations
  const { active, setActive } = stores.classifierStore.drawing
  return {
    active,
    annotations,
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
      annotations,
      task
    } = this.props
    // let annotation
    // if (annotations && annotations.size > 0) {
    //   annotation = annotations.get(task.taskKey)
    // }
    return (
      <StyledFieldset>
        <StyledText size='small' tag='legend'>
          <Markdownz>
            {task.instruction}
          </Markdownz>
        </StyledText>

        {task.tools.map((tool, index) => {
          const checked = active === index
          const Icon = icons[tool.type]
          // TODO add count for min/max
          return (
            <TaskInputField
              checked={checked}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={tool.label}
              labelIcon={<InputIcon icon={<Icon />} tool={tool} />}
              labelStatus={<InputStatus tool={tool} />}
              name='drawing-tool'
              onChange={this.onChange.bind(this, index)}
              required={task.required}
              type='radio'
            />
          )
        })}
      </StyledFieldset>
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
