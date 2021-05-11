import { RadioButtonGroup } from 'grommet'
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

  return (
    <RadioButtonGroup
      direction='row'
      name={questionId}
      onChange={({ target }) => handleAnswer(target.value, questionId)}
      options={options}
      value={questionAnswer}
      wrap
    >
      {(option, { checked, hover }) => {
        return (
          <RadioInput
            checked={checked}
            label={option.label}
          />
        )
      }}
    </RadioButtonGroup>
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
