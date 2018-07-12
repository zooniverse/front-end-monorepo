import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import WithHoverOrFocusProp from '../WithHoverOrFocusProp'

const StyledButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
`

const Background = styled.circle`
  fill: ${props => (props.hoverOrFocus || props.active) ? '#00979D' : 'transparent'};
  opacity: ${props => props.hoverOrFocus ? '0.5' : '1'};
`

const IconSVG = styled.svg`
  fill: ${props => (props.hoverOrFocus || props.active) ? 'white' : 'black'};
`

class Button extends React.Component {
  getSize (sizeInPercent) {
    const position = (100 - sizeInPercent) / 2
    return {
      x: `${position}%`,
      y: `${position}%`,
      height: `${sizeInPercent}%`,
      width: `${sizeInPercent}%`
    }
  }

  render () {
    const {
      active,
      adjustments,
      children,
      eventHandlers,
      hoverOrFocus,
      size,
      ...buttonProps
    } = this.props

    const sizeProps = {...this.getSize(size)}

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, sizeProps))

    return (
      <StyledButton {...eventHandlers} {...buttonProps}>
        <svg viewBox='0 0 100 100'>
          <Background
            active={active}
            hoverOrFocus={hoverOrFocus}
            cx='50'
            cy='50'
            r='50'
          />
          <IconSVG
            active={active}
            hoverOrFocus={hoverOrFocus}
            {...adjustments}
          >
            {childrenWithProps}
          </IconSVG>
        </svg>
      </StyledButton>
    )
  }
}

Button.propTypes = {
  active: PropTypes.bool,
  adjustments: PropTypes.object,
  children: PropTypes.node,
  eventHandlers: PropTypes.object,
  onClick: PropTypes.func,
  size: PropTypes.string
}

Button.defaultProps = {
  active: false,
  hoverOrFocus: false,
  size: '46'
}

export default WithHoverOrFocusProp(Button)
