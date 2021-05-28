import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import RadioInput from './components/RadioInput'

export default function RadioInputs (props) {
  const {
    handleAnswer,
    options,
    questionAnswer,
    questionId
  } = props

  function handleRadioChange (value) {
    if (questionAnswer === value) {
      handleAnswer('', questionId)
    } else {
      handleAnswer(value, questionId)
    }
  }

  return (
    <Box
      direction='row'
      wrap
    >
      {options.map(option => {
        const isChecked = questionAnswer === option.value

        return (
          <RadioInput
            key={option.value}
            handleRadioChange={handleRadioChange}
            isChecked={isChecked}
            option={option}
            questionId={questionId}
          />
        )
      })}
    </Box>
  )
}

RadioInputs.defaultProps = {
  handleAnswer: () => {},
  options: [],
  questionAnswer: undefined,
  questionId: ''
}

RadioInputs.propTypes = {
  handleAnswer: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  questionAnswer: PropTypes.string,
  questionId: PropTypes.string
}
