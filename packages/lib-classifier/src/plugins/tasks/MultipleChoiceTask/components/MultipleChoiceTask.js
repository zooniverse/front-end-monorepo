import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import TaskInput from '../../components/TaskInput'

const maxWidth = pxToRem(60)
const StyledBox = styled(Box)`
  img:only-child, svg:only-child {
    ${props => props.theme && css`background: ${props.theme.global.colors.brand};`}
    max-width: ${maxWidth};
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

function MultipleChoiceTask (props) {
  const {
    annotation,
    className,
    disabled,
    task,
    theme
  } = props
  const { value } = annotation

  function onChange (index, event) {
    const newValue = value ? value.slice(0) : []
    if (event.target.checked && !newValue.includes(index)) {
      newValue.push(index)
    } else if (!event.target.checked && newValue.includes(index)) {
      const indexInValue = newValue.indexOf(index)
      newValue.splice(indexInValue, 1)
    }
    annotation.update(newValue)
  }

  return (
    <StyledBox
      autoFocus={(value && value.length === 0)}
      className={className}
      disabled={disabled}
      theme={theme}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {task.question}
        </Markdownz>
      </StyledText>
      {task.answers.map((answer, index) => {
        const checked = (value && value.length > 0) ? value.includes(index) : false
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
            type='checkbox'
          />
        )
      })}
    </StyledBox>
  )
}

MultipleChoiceTask.defaultProps = {
  className: '',
  disabled: false,
  theme: {
    global: {
      colors: {}
    }
  }
}

MultipleChoiceTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.array
  }).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string
    })),
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.string
  }).isRequired,
  theme: PropTypes.shape({
    global: PropTypes.shape({
      colors: PropTypes.object
   })
 })
}

export default MultipleChoiceTask
export { MultipleChoiceTask }
