import { Box, CheckBoxGroup, RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import getQuestionIds from '../helpers/getQuestionIds'

export default function Questions (props) {
  const { choiceId, task } = props

  const questionIds = getQuestionIds(choiceId, task)

  return (
    <Box
      flex='grow'
    >
      {questionIds.map(questionId => {
        const question = task.questions[questionId] || { answers: {}, answersOrder: [] }
        const inputType = question.multiple ? 'checkbox' : 'radio'
        const labels = question.answersOrder.map(answerId => question.answers[answerId].label)

        return (
          <Box>
            <SpacedHeading>{question.label}</SpacedHeading>
            {inputType === 'checkbox' ? (
              <CheckBoxGroup
                direction='row'
                options={labels}
                wrap
              />
            ) : (
              <RadioButtonGroup
                direction='row'
                options={labels}
                wrap
              />
            )}
          </Box>
        )
      })}
    </Box>
  )
}

Questions.defaultProps = {
  choiceId: ''
}

Questions.propTypes = {
  choiceId: PropTypes.string,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired
}
