import PropTypes from 'prop-types'
import React from 'react'

export default function CheckBoxOption (props) {
  const {
    handleCheckBoxChange,
    isChecked,
    option,
    questionId
  } = props

  return (
    <label>
      <input
        name={questionId}
        value={option.value}
        type='checkbox'
        checked={isChecked}
        onChange={({ target }) => (handleCheckBoxChange(target.checked, target.value))}
      />
      {option.label}
    </label>
  )
}

CheckBoxOption.defaultProps = {
  handleCheckBoxChange: () => {},
  isChecked: false,
  option: {
    label: '',
    value: ''
  },
  questionId: ''
}

CheckBoxOption.propTypes = {
  handleCheckBoxChange: PropTypes.func,
  isChecked: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  questionId: PropTypes.string
}
