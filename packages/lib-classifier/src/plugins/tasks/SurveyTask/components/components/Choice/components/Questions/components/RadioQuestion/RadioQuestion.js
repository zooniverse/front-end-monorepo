import { RadioButtonGroup } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

export default function RadioQuestion (props) {
  const {
    handleAnswer,
    labels,
    questionId,
    value
  } = props

  return (
    <RadioButtonGroup
      direction='row'
      name={questionId}
      onChange={({ target }) => handleAnswer(target.value, questionId)}
      options={labels}
      value={value}
      wrap
    />
  )
}

RadioQuestion.defaultProps = {
  handleAnswer: () => {},
  labels: [],
  questionId: '',
  value: undefined
}

RadioQuestion.propTypes = {
  handleAnswer: PropTypes.func,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  questionId: PropTypes.string,
  value: PropTypes.string
}
