import { Box, CheckBoxGroup, RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import getQuestionIds from '../helpers/getQuestionIds'

export default function Questions (props) {
  const { choiceId, task } = props
  const [ answers, setAnswers ] = useState({})
  console.log('answers', answers)

  const questionIds = getQuestionIds(choiceId, task)

  function handleAnswer (value, questionId) {
    const newAnswers = Object.assign({}, answers)
    newAnswers[questionId] = value

    setAnswers(newAnswers)
  }

  return (
    <Box
      flex='grow'
    >
      {questionIds.map(questionId => {
        const question = task.questions?.[questionId] || { answers: {}, answersOrder: [] }
        const inputType = question.multiple ? 'checkbox' : 'radio'
        const labels = question.answersOrder.map(answerId => ({
          label: question.answers[answerId].label,
          value: answerId
        }))

        return (
          <Box
            key={questionId}
          >
            <SpacedHeading>{question.label}</SpacedHeading>
            {inputType === 'checkbox' ? (
              <CheckBoxGroup
                direction='row'
                name={questionId}
                onChange={({ value }) => handleAnswer(value, questionId)}
                options={labels}
                wrap
              />
            ) : (
              <RadioButtonGroup
                direction='row'
                name={questionId}
                onChange={({ target }) => handleAnswer(target.value, questionId)}
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
