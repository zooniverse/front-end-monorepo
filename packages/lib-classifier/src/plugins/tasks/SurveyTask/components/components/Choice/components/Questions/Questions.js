import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import CheckBoxInputs from './components/CheckBoxInputs'
import RadioInputs from './components/RadioInputs'

export default function Questions (props) {
  const {
    answers,
    hasFocus,
    questionIds,
    questions,
    setAnswers
  } = props

  function handleAnswer (questionAnswer, questionId) {
    const newAnswers = Object.assign({}, answers, { [questionId]: questionAnswer })

    // if questionAnswer is an empty string (cleared radio input) or an empty array (cleared checkbox inputs) then questionAnswer length is 0
    if (questionAnswer.length === 0) {
      delete newAnswers[questionId]
    }

    setAnswers(newAnswers)
  }

  return (
    <Box
      flex='grow'
    >
      {questionIds.map((questionId, index) => {
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
                <CheckBoxInputs
                  handleAnswer={handleAnswer}
                  hasFocus={hasFocus && index === 0}
                  options={options}
                  questionId={questionId}
                  questionAnswer={answers[questionId]}
                />
                )
              : (
                <RadioInputs
                  handleAnswer={handleAnswer}
                  hasFocus={hasFocus && index === 0}
                  options={options}
                  questionId={questionId}
                  questionAnswer={answers[questionId]}
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
  hasFocus: false,
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
  hasFocus: PropTypes.bool,
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
