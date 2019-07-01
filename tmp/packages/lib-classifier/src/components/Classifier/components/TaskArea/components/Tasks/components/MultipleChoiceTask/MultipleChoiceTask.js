import { Markdownz } from '@zooniverse/react-components'
import { Text } from 'grommet'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
class MultipleChoiceTask extends React.Component {
  onChange (index, event) {
    const { addAnnotation, annotations, task } = this.props
    const annotation = annotations.get(task.taskKey)
    const newAnnotationValue = (annotation) ? annotation.value.slice(0) : []
    if (event.target.checked && !newAnnotationValue.includes(index)) {
      newAnnotationValue.push(index)
    } else if (!event.target.checked && newAnnotationValue.includes(index)) {
      const indexInValue = newAnnotationValue.indexOf(index)
      newAnnotationValue.splice(indexInValue, 1)
    }
    addAnnotation(newAnnotationValue, task)
  }

  render () {
    const {
      annotations,
      disabled,
      task
    } = this.props
    let annotation
    if (annotations && annotations.size > 0) {
      annotation = annotations.get(task.taskKey)
    }
    return (
      <StyledFieldset
        autoFocus={(annotation && annotation.value && annotation.value.length === 0)}
        disabled={disabled}
      >
        <StyledText size='small' tag='legend'>
          <Markdownz>
            {task.question}
          </Markdownz>
        </StyledText>
        {task.answers.map((answer, index) => {
          const checked = (annotation && annotation.value && annotation.value.length > 0) ? annotation.value.includes(index) : false
          return (
            <TaskInputField
              autoFocus={checked}
              checked={checked}
              disabled={disabled}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={answer.label}
              name={task.taskKey}
              onChange={this.onChange.bind(this, index)}
              required={task.required}
              type='checkbox'
            />
          )
        })}
      </StyledFieldset>
    )
  }
}

MultipleChoiceTask.wrappedComponent.defaultProps = {
  addAnnotation: () => {},
  annotations: observable.map(),
  disabled: false,
  task: {}
}

MultipleChoiceTask.wrappedComponent.propTypes = {
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

export default MultipleChoiceTask
