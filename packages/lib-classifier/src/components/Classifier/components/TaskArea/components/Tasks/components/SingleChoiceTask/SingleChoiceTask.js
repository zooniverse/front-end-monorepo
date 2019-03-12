import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { observable } from 'mobx'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Markdown, Text } from 'grommet'
import TaskInputField from '../TaskInputField'

export const StyledFieldset = styled.fieldset`
  border: none;
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
    if (event.target.checked) addAnnotation(index, task.toJSON())
  }

  render () {
    const {
      annotations,
      task
    } = this.props
    let annotation
    if (annotations && annotations.size > 0) {
      annotation = annotations.get(task.taskKey)
    }

    return (
      <StyledFieldset>
        <Text size='small' tag='legend'><Markdown>{task.question}</Markdown></Text>
        {task.answers.map((answer, index) => {
          const checked = (annotation && annotation.value) ? index === annotation.value : false
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
      </StyledFieldset>
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
