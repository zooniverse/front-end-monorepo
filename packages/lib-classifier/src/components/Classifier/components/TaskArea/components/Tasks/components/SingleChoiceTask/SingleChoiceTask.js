import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Markdown, Text } from 'grommet'
import TaskInputField from '../TaskInputField'
import TaskHelpButton from '../TaskHelpButton'

export const StyledFieldset = styled.fieldset`
  border: none;
`

export default function SingleChoiceTask ({ annotation, task }) {
  return (
    <Box tag='form'>
      <StyledFieldset>
        <Text size='small' tag='legend'><Markdown>{task.question}</Markdown></Text>
        {task.answers.map((answer, index) => {
          return (
            <TaskInputField
              annotation={annotation}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={answer.label}
              name={`${task._key}`}
              required={task.required}
              type='radio'
            />
          )
        })}
      </StyledFieldset>
      {task.help &&
        <TaskHelpButton />}
    </Box>
  )
}

SingleChoiceTask.defaultProps = {
  annotation: {
    value: null
  }
}

SingleChoiceTask.propTypes = {
  annotation: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  }),
  task: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string
    })),
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.bool
  })
}
