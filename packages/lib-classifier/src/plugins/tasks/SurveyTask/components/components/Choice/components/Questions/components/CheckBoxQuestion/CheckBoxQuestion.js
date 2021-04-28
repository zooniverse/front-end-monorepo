import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import CheckBoxOption from './components/CheckBoxOption'

export default function CheckBoxQuestion (props) {
  const {
    handleAnswer,
    options,
    questionAnswer,
    questionId
  } = props

  function handleCheckBoxChange (checked, value) {
    const newQuestionAnswer = Array.from(questionAnswer)

    if (checked) {
      newQuestionAnswer.push(value)
    } else {
      newQuestionAnswer.splice(newQuestionAnswer.indexOf(value), 1)
    }

    handleAnswer(newQuestionAnswer, questionId)
  }

  return (
    <Box
      direction='row'
      wrap
    >
      {options.map(option => {
        const isChecked = questionAnswer.indexOf(option.value) > -1

        return (
          <CheckBoxOption
            key={option.value}
            handleCheckBoxChange={handleCheckBoxChange}
            isChecked={isChecked}
            option={option}
            questionId={questionId}
          />
        )
      })}
    </Box>
  )
}

CheckBoxQuestion.defaultProps = {
  handleAnswer: () => {},
  options: [],
  questionAnswer: [],
  questionId: ''
}

CheckBoxQuestion.propTypes = {
  handleAnswer: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  questionAnswer: PropTypes.arrayOf(PropTypes.string),
  questionId: PropTypes.string
}
