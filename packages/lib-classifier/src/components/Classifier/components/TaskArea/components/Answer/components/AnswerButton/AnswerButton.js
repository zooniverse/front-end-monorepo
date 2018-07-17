import React from 'react'
import styled from 'styled-components'

import WithHoverOrFocusProp from '../../../../../WithHoverOrFocusProp'

const StyledButton = styled.button`
  border: 0;
  background-color: ${props => props.active ? '#00979d' : '#EFF2F5' }};
  ${props => (!props.active && props.hoverOrFocus &&
    'background-image: linear-gradient(to bottom, #abdcdf, #a3d9dc, #9cd6d9, #94d2d6, #8ccfd3);'
  )}
  box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  cursor: pointer;
  font-family: Karla;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
`

class AnswerButton extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onButtonClick(this.props.label)
  }

  render () {
    const {
      active,
      eventHandlers,
      isFocused,
      isHovering,
      label,
    } = this.props

    return (
      <StyledButton
        active={active}
        aria-pressed={active}
        hoverOrFocus={isFocused || isHovering}
        onClick={this.handleClick}
        {...eventHandlers}
      >
        {label}
      </StyledButton>
    )
  }
}

export default WithHoverOrFocusProp(AnswerButton)
