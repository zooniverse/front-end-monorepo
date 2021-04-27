import { Box, CheckBoxGroup } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import RadioQuestion from './components/RadioQuestion'

export default function Questions (props) {
  const {
    answers,
    questionIds,
    questions,
    setAnswers
  } = props

  function handleAnswer (value, questionId) {
    const newAnswers = Object.assign({}, answers, { [questionId]: value })

    setAnswers(newAnswers)
  }

  return (
    <Box
      flex='grow'
    >
      {questionIds.map(questionId => {
        const question = questions[questionId] || { answers: {}, answersOrder: [] }
        const inputType = question.multiple ? 'checkbox' : 'radio'
        const options = question.answersOrder.map(answerId => ({
          label: question.answers[answerId].label,
          value: answerId
        }))

        return (
          <Box
            key={questionId}
          >
            <SpacedHeading>{question.label}</SpacedHeading>
            {inputType === 'checkbox'
              ? (
                <CheckBoxGroup
                  direction='row'
                  name={questionId}
                  onChange={({ value }) => handleAnswer(value, questionId)}
                  options={options}
                  value={answers[questionId]}
                  wrap
                />
                )
              : (
                <RadioQuestion
                  handleAnswer={handleAnswer}
                  options={options}
                  questionId={questionId}
                  value={answers[questionId]}
                />
                )}
          </Box>
        )
      })}
    </Box>
  )
}

Questions.defaultProps = {
  answers: {},
  questionIds: [],
  questions: {},
  setAnswers: () => {}
}

Questions.propTypes = {
  answers: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ])
  ),
  questionIds: PropTypes.arrayOf(
    PropTypes.string
  ),
  questions: PropTypes.shape({
    answers: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string
      })
    ),
    answersOrder: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    multiple: PropTypes.bool,
    required: PropTypes.bool
  }),
  setAnswers: PropTypes.func
}
