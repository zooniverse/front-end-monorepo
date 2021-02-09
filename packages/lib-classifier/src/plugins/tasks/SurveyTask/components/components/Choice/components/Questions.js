import { Box, CheckBoxGroup, RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

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
        const question = questions[questionId] || { answers: {}, answersOrder: [] }
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
  answers: {},
  questionIds: [],
  questions: {},
  setAnswers: () => {}
}

Questions.propTypes = {
  answers: PropTypes.object,
  questionIds: PropTypes.arrayOf(
    PropTypes.string
  ),
  questions: PropTypes.object,
  setAnswers: PropTypes.func
}
