import { Markdownz } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { observable } from 'mobx'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
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

function SingleChoiceTask (props) {
  const {
    annotations,
    className,
    disabled,
    task
  } = props
  const { annotation } = task
  const [ value, setValue ] = useState(annotation.value)
  function onChange (index, event) {
    setValue(index)
    if (event.target.checked) task.updateAnnotation(index)
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
  disabled: false,
  task: {}
}

SingleChoiceTask.propTypes = {
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
