import { CheckBoxGroup } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

export default function CheckBoxQuestion (props) {
  const {
    handleAnswer,
    options,
    questionId,
    value
  } = props

  return (
    <CheckBoxGroup
      direction='row'
      name={questionId}
      onChange={({ value }) => handleAnswer(value, questionId)}
      options={options}
      value={value}
      wrap
    />
  )
}

CheckBoxQuestion.defaultProps = {
  handleAnswer: () => {},
  options: [],
  questionId: '',
  value: undefined
}

CheckBoxQuestion.propTypes = {
  handleAnswer: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  questionId: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
}
