import { withFocusProps, withHoverProps } from '@klarna/higher-order-components'
import { bool, func, node, object, shape, string } from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

const StyledButton = styled.button`
  background: none;
  border: 0;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.3' : '1'};
  padding: 0;
`

const Background = styled.circle`
  fill: ${props => props.dark ? '#2d2d2d' : 'transparent'};
  ${props => (props.hoveredOrFocused || props.active) && `
    fill: #00979D;
  `}
  opacity: ${props => props.hoveredOrFocused ? '0.5' : '1'};
`

const IconSVG = styled.svg`
  fill: ${props => props.dark ? 'white' : 'black'};
  ${props => (!props.dark && (props.hoveredOrFocused || props.active)) && `
    fill: white;
  `}
`

@withTheme
@withHoverProps({ hovered: true })
@withFocusProps({ focused: true })
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
      a11yTitle,
      children,
      disabled,
      focused,
      hovered,
      onBlur,
      onClick,
      onFocus,
      onMouseOver,
      onMouseOut,
      size,
      svgAdjustments,
      theme: { dark }
    } = this.props

    const hoveredOrFocused = hovered || focused

    const eventHandlers = (disabled)
      ? {}
      : {
        onBlur,
        onClick,
        onFocus,
        onMouseOver,
        onMouseOut
      }

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { ...this.getSize(size) }))

    return (
      <StyledButton
        aria-label={a11yTitle}
        disabled={disabled}
        {...eventHandlers}
      >
        <svg viewBox='0 0 100 100'>
          <Background
            active={active}
            dark={dark}
            hoveredOrFocused={hoveredOrFocused}
            cx='50'
            cy='50'
            r='50'
          />
          <IconSVG
            active={active}
            dark={dark}
            hoveredOrFocused={hoveredOrFocused}
            {...svgAdjustments}
          >
            {childrenWithProps}
          </IconSVG>
        </svg>
      </StyledButton>
    )
  }
}

Button.propTypes = {
  active: bool,
  children: node,
  focused: bool,
  hovered: bool,
  onBlur: func,
  onClick: func,
  onFocus: func,
  onMouseOver: func,
  onMouseOut: func,
  size: string,
  svgAdjustments: object,
  theme: shape({
    dark: bool
  })
}

Button.defaultProps = {
  active: false,
  onBlur: () => {},
  onClick: () => {},
  onFocus: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {},
  size: '46'
}

export default Button
