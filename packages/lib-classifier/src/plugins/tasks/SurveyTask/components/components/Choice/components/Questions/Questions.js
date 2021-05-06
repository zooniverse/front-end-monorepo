import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import CheckBoxInputs from './components/CheckBoxInputs'
import RadioInputs from './components/RadioInputs'

export default function Questions (props) {
  const {
    answers,
    questionIds,
    questions,
    setAnswers
  } = props

  function handleAnswer (questionAnswer, questionId) {
    const newAnswers = Object.assign({}, answers, { [questionId]: questionAnswer })

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
                <CheckBoxInputs
                  handleAnswer={handleAnswer}
                  options={options}
                  questionId={questionId}
                  questionAnswer={answers[questionId]}
                />
                )
              : (
                <RadioInputs
                  handleAnswer={handleAnswer}
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
