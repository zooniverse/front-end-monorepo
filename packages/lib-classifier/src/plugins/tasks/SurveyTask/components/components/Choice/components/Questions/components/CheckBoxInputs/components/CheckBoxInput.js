import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export const StyledBox = styled(Box)`
  cursor: pointer;
  
  > span {
    cursor: pointer;
  }
  
  > input {
    cursor: pointer;
    opacity: 0.01;
    position: absolute;
  }
`

export default function CheckBoxInput (props) {
  const {
    handleCheckBoxChange,
    isChecked,
    option,
    questionId
  } = props

  const backgroundColor = isChecked ? 'accent-2' : 'neutral-6'

  return (
    <label>
      <StyledBox
        align='center'
        background={{ color: backgroundColor }}
        height='40px'
        justify='center'
        margin={{
          bottom: 'xsmall',
          right: 'xsmall'
        }}
        pad={{ horizontal: 'xsmall' }}
      >
        <input
          name={questionId}
          value={option.value}
          type='checkbox'
          checked={isChecked}
          onChange={({ target }) => (handleCheckBoxChange(target.checked, target.value))}
        />
        <Text
          color='dark-1'
          weight={isChecked ? 'bold' : 'normal'}
        >
          {option.label}
        </Text>
      </StyledBox>
    </label>
  )
}

CheckBoxInput.defaultProps = {
  handleCheckBoxChange: () => {},
  isChecked: false,
  option: {
    label: '',
    value: ''
  },
  questionId: ''
}

CheckBoxInput.propTypes = {
  handleCheckBoxChange: PropTypes.func,
  isChecked: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  questionId: PropTypes.string
}
