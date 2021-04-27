import { RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import RadioOption from './components/RadioOption'

export default function RadioQuestion (props) {
  const {
    handleAnswer,
    options,
    questionId,
    value
  } = props

  return (
    <RadioButtonGroup
      direction='row'
      name={questionId}
      onChange={({ target }) => handleAnswer(target.value, questionId)}
      options={options}
      value={value}
      wrap
    >
      {(option, { checked, hover }) => {
        return (
          <RadioOption
            checked={checked}
            label={option.label}
          />
        )
      }}
    </RadioButtonGroup>
  )
}

RadioQuestion.defaultProps = {
  handleAnswer: () => {},
  options: [],
  questionId: '',
  value: undefined
}

RadioQuestion.propTypes = {
  handleAnswer: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  questionId: PropTypes.string,
  value: PropTypes.string
}
