import React from 'react';
import PropTypes from 'prop-types';
import { Box, Markdown } from 'grommet'
import TaskInputField from '../TaskInputField'
import TaskHelpButton from '../TaskHelpButton'

export default function SingleChoiceTask({ annotation, task }) {
  return (
    <Box tag="form">
      <Box tag="fieldset">
        <legend><Markdown>{task.question}</Markdown></legend>
        {task.answers.map((answer, index) => {
          return (
            <TaskInputField
              annotation={annotation}
              index={index}
              key={`${task.taskKey}_${index}`}
              label={answer.label}
              name={`${task._key}`}
              required={task.required}
              type="radio"
            />
          )
        })}
      </Box>
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