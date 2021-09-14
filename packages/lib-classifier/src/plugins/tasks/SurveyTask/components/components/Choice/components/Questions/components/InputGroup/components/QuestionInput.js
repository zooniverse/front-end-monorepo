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

  &:focus-within {
    box-shadow: 0 0 2px 2px ${props => props.theme.global.colors[props.theme.global.colors.focus]};
  }

  &:hover:not(:focus-within) {
    box-shadow: 0 0 2px 2px ${props => props.theme.global.colors.brand};
  } 
`

function QuestionInput (props) {
  const {
    handleCheckBoxChange,
    handleRadioChange,
    handleRadioKeyDown,
    hasFocus,
    isChecked,
    option,
    questionId,
    theme,
    type
  } = props

  let backgroundColor = 'neutral-6'
  if (theme.dark) {
    backgroundColor = 'dark-3'
  }
  if (isChecked) {
    backgroundColor = 'accent-1'
  }

  const handleChange = type === 'checkbox' ? handleCheckBoxChange : handleRadioChange

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
        round={type === 'radio' ? 'full' : false}
        width={{ min: '40px' }}
      >
        <input
          autoFocus={hasFocus}
          name={questionId}
          value={option.value}
          type={type}
          checked={isChecked}
          onChange={({ target }) => (handleChange(target.value, target.checked))}
          onClick={type === 'radio' ? ({ target }) => (handleRadioChange(target.value)) : null}
          onKeyDown={type === 'radio' ? (event) => (handleRadioKeyDown(event)) : null}
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

QuestionInput.defaultProps = {
  handleCheckBoxChange: () => {},
  handleRadioChange: () => {},
  handleRadioKeyDown: () => {},
  hasFocus: false,
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

QuestionInput.propTypes = {
  handleCheckBoxChange: PropTypes.func,
  handleRadioChange: PropTypes.func,
  handleRadioKeyDown: PropTypes.func,
  hasFocus: PropTypes.bool,
  isChecked: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  questionId: PropTypes.string,
  theme: PropTypes.shape({
    dark: PropTypes.bool
  }),
  type: PropTypes.string.isRequired
}

export default withTheme(QuestionInput)
export { QuestionInput }
