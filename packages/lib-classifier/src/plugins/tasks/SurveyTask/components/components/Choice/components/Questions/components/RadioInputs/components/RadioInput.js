import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

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

function RadioInput (props) {
  const {
    handleRadioChange,
    isChecked,
    option,
    questionId,
    theme
  } = props

  let backgroundColor = 'neutral-6'
  if (theme.dark) {
    backgroundColor = 'dark-3'
  }
  if (isChecked) {
    backgroundColor = 'accent-1'
  }

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
          name={questionId}
          value={option.value}
          type='radio'
          checked={isChecked}
          onChange={({ target }) => (handleRadioChange(target.value))}
          onClick={({ target }) => (handleRadioChange(target.value))}
        />
        <Text
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
  isChecked: false,
  option: {
    label: '',
    value: ''
  },
  questionId: '',
  theme: {
    dark: false
  }
}

RadioInput.propTypes = {
  handleRadioChange: PropTypes.func,
  isChecked: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  questionId: PropTypes.string,
  theme: PropTypes.shape({
    dark: false
  })
}

export default withTheme(RadioInput)
export { RadioInput }
