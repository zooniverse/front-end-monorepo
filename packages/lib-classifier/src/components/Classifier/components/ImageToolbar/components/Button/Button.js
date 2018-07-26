import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { withFocusProps, withHoverProps } from '@klarna/higher-order-components'

const StyledButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
`

const Background = styled.circle`
  fill: ${props => (props.hoveredOrFocused || props.active) ? '#00979D' : 'transparent'};
  opacity: ${props => props.hoveredOrFocused ? '0.5' : '1'};
`

const IconSVG = styled.svg`
  fill: ${props => (props.hoveredOrFocused || props.active) ? 'white' : 'black'};
`

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
      children,
      focused,
      hovered,
      onBlur,
      onFocus,
      onMouseOver,
      onMouseOut,
      size,
      svgAdjustments
    } = this.props
    
    const hoveredOrFocused = hovered || focused

    const eventHandlers = {
      onBlur,
      onFocus,
      onMouseOver,
      onMouseOut,
    }

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { ...this.getSize(size) }))

    return (
      <StyledButton {...eventHandlers}>
        <svg viewBox='0 0 100 100'>
          <Background
            active={active}
            hoveredOrFocused={hoveredOrFocused}
            cx='50'
            cy='50'
            r='50'
          />
          <IconSVG
            active={active}
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
  active: PropTypes.bool,
  children: PropTypes.node,
  focused: PropTypes.bool,
  hovered: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  size: PropTypes.string,
  svgAdjustments: PropTypes.object
}

Button.defaultProps = {
  active: false,
  size: '46'
}

export default Button
