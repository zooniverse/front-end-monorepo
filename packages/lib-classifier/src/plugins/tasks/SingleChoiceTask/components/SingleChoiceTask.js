import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'
import TaskInput from '../../components/TaskInput'

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

function SingleChoiceTask (props) {
  const {
    annotation,
    className,
    disabled,
    task
  } = props
  const { value } = annotation
  function onChange (index, event) {
    if (event.target.checked) annotation.update(index)
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
        const checked = (value + 1) ? index === value : false
        return (
          <TaskInput
            autoFocus={checked}
            checked={checked}
            disabled={disabled}
            index={index}
            key={`${task.taskKey}_${index}`}
            label={answer.label}
            name={task.taskKey}
            onChange={onChange.bind(this, index)}
            required={task.required}
            type='radio'
          />
        )
      })}
    </StyledBox>
  )
}

SingleChoiceTask.defaultProps = {
  className: '',
  disabled: false
}

SingleChoiceTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.number
  }).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string
    })),
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.bool
  }).isRequired
}

export default SingleChoiceTask
