import { RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

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
    />
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
