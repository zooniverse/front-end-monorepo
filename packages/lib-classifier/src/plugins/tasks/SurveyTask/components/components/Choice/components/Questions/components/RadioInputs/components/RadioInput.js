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

  &:focus-within {
    box-shadow: 0 0 2px 2px ${props => props.theme.global.colors[props.theme.global.colors.focus]};
  }
`

export default function RadioInput (props) {
  const {
    handleRadioChange,
    hasFocus,
    isChecked,
    option,
    questionId
  } = props

  const backgroundColor = isChecked ? 'accent-1' : 'neutral-6'

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
        round='full'
        width={{ min: '40px' }}
      >
        <input
          autoFocus={hasFocus}
          name={questionId}
          value={option.value}
          type='radio'
          checked={isChecked}
          onChange={({ target }) => (handleRadioChange(target.value))}
          onClick={({ target }) => (handleRadioChange(target.value))}
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

RadioInput.defaultProps = {
  handleRadioChange: () => {},
  hasFocus: false,
  isChecked: false,
  option: {
    label: '',
    value: ''
  },
  questionId: ''
}

RadioInput.propTypes = {
  handleRadioChange: PropTypes.func,
  hasFocus: PropTypes.bool,
  isChecked: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  questionId: PropTypes.string
}
