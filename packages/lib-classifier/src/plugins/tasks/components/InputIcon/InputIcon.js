import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export const StyledInputIcon = styled.span`
  ${props => props.color && css`color: ${props.color};`}
  background-color: #2D2D2D;
  display: flex;
  align-items: center;
  padding-left: 15px;

  &::after {
    content: " ";
    margin-right: 1ch;
    white-space: pre;
  }

  > svg {
    fill-opacity: 0.1;
    height: 1.5em;
    stroke: currentColor;
    stroke-width: 5;
    vertical-align: bottom;
    width: 1.5em;
  }
`

export default function InputIcon (props) {
  return (
    <StyledInputIcon color={props.tool.color}>
      {props.icon}
    </StyledInputIcon>
  )
}

InputIcon.defaultProps = {
  tool: {
    color: '',
    type: ''
  }
}

InputIcon.propTypes = {
  tool: PropTypes.shape({
    color: PropTypes.string,
    type: PropTypes.string
  })
}
