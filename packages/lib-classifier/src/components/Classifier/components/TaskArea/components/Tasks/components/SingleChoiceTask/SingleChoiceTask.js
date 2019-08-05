import { Markdownz } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'
import { pxToRem } from '@zooniverse/react-components'
import TaskInput from '../TaskInput'

const StyledBox = styled(Box)`
  img:only-child, svg:only-child {
    background-color: ${zooTheme.global.colors.brand};
    max-width: ${pxToRem(60)};
  }
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
  const {
    addAnnotation
  } = stores.classifierStore.classifications
  const annotations = stores.classifierStore.classifications.currentAnnotations
  return {
    addAnnotation,
    annotations
  }
}

@inject(storeMapper)
@observer
class SingleChoiceTask extends React.Component {
  onChange (index, event) {
    const { addAnnotation, task } = this.props
    if (event.target.checked) addAnnotation(index, task)
  }

  render () {
    const {
      annotations,
      className,
      disabled,
      task
    } = this.props
    let annotation
    if (annotations && annotations.size > 0) {
      annotation = annotations.get(task.taskKey)
    }

    return (
      <StyledBox
        className={className}
        disabled={disabled}
      >
        <StyledText size='small' tag='legend'>
          <Markdownz>
            {task.question}
          </Markdownz>
        </StyledText>

        {task.answers.map((answer, index) => {
          const checked = (annotation && annotation.value + 1) ? index === annotation.value : false
          return (
            <TaskInput
              autoFocus={checked}
              checked={checked}
              disabled={disabled}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={answer.label}
              name={task.taskKey}
              onChange={this.onChange.bind(this, index)}
              required={task.required}
              type='radio'
            />
          )
        })}
      </StyledBox>
    )
  }
}

SingleChoiceTask.wrappedComponent.defaultProps = {
  addAnnotation: () => {},
  annotations: observable.map(),
  disabled: false,
  task: {}
}

SingleChoiceTask.wrappedComponent.propTypes = {
  addAnnotation: PropTypes.func,
  annotations: MobXPropTypes.observableMap,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string
    })),
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.bool
  })
}

export default SingleChoiceTask
