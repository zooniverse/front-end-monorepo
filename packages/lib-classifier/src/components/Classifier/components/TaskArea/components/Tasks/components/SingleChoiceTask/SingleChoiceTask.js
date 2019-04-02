import { Markdownz } from '@zooniverse/react-components'
import { Markdown, Text } from 'grommet'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import TaskInputField from '../TaskInputField'

export const StyledBox = styled(Box)`
  border: none;
  margin: 0;
  padding: 0;
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
      task
    } = this.props
    let annotation
    if (annotations && annotations.size > 0) {
      annotation = annotations.get(task.taskKey)
    }

    return (
      <StyledBox as='fieldset' className={className}>
        <Text size='small' tag='legend'>
          <Markdownz>
            {task.question}
          </Markdownz>
        </Text>

        {task.answers.map((answer, index) => {
          const checked = (annotation && annotation.value + 1) ? index === annotation.value : false
          return (
            <TaskInputField
              autoFocus={checked}
              checked={checked}
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
  task: {}
}

SingleChoiceTask.wrappedComponent.propTypes = {
  addAnnotation: PropTypes.func,
  annotations: MobXPropTypes.observableMap,
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
