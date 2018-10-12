import { inject, observer } from 'mobx-react'
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
  render () {
    const {
      addAnnotation,
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
          const newAnnotation = { value: index, task: task.taskKey }
          return (
            <TaskInputField
              annotation={annotation}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={answer.label}
              name={`${task._key}`}
              onChange={addAnnotation.bind(this, newAnnotation, task.type)}
              required={task.required}
              type='radio'
            />
          )
        })}
      </StyledFieldset>
    )
  }
}

SingleChoiceTask.propTypes = {
  addAnnotation: PropTypes.func.isRequired,
  annotations: PropTypes.object,
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
