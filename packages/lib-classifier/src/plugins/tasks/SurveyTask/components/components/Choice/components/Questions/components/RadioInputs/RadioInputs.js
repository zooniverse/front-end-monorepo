import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import RadioInput from './components/RadioInput'

export default function RadioInputs (props) {
  const {
    handleAnswer,
    hasFocus,
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

  function handleRadioKeyDown (event) {
    const { value } = event.target
    if (questionAnswer !== value) return true

    switch (event.key) {
      case ' ':
      case 'Backspace':
      case 'Delete': {
        event.preventDefault()
        event.stopPropagation()

        handleAnswer('', questionId)

        return false
      }
      default: {
        return true
      }
    }
  }

  return (
    <Box
      direction='row'
      wrap
    >
      {options.map((option, index) => {
        const isChecked = questionAnswer === option.value
        let inputHasFocus = false
        if (questionAnswer) {
          inputHasFocus = hasFocus && isChecked
        } else {
          inputHasFocus = hasFocus && index === 0
        }

        return (
          <RadioInput
            key={option.value}
            handleRadioChange={handleRadioChange}
            handleRadioKeyDown={handleRadioKeyDown}
            hasFocus={inputHasFocus}
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
  hasFocus: false,
  options: [],
  questionAnswer: undefined,
  questionId: ''
}

RadioInputs.propTypes = {
  handleAnswer: PropTypes.func,
  hasFocus: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  questionAnswer: PropTypes.string,
  questionId: PropTypes.string
}
