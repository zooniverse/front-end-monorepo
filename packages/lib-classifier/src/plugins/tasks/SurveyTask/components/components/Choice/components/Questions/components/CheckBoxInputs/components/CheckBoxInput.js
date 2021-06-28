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
`

function CheckBoxInput (props) {
  const {
    handleCheckBoxChange,
    hasFocus,
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
      >
        <input
          autoFocus={hasFocus}
          name={questionId}
          value={option.value}
          type='checkbox'
          checked={isChecked}
          onChange={({ target }) => (handleCheckBoxChange(target.checked, target.value))}
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

CheckBoxInput.defaultProps = {
  handleCheckBoxChange: () => {},
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

CheckBoxInput.propTypes = {
  handleCheckBoxChange: PropTypes.func,
  hasFocus: PropTypes.bool,
  isChecked: PropTypes.bool,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  questionId: PropTypes.string,
  theme: PropTypes.shape({
    dark: PropTypes.bool
  })
}

export default withTheme(CheckBoxInput)
export { CheckBoxInput }
