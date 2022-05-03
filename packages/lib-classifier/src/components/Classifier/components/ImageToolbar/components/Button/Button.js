import { bool, func } from 'prop-types'
import React from 'react'
import { Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'
import { pxToRem } from '@zooniverse/react-components'

const paddingSize = pxToRem(13)
const svgSize = pxToRem(18)

const StyledButton = styled(GrommetButton)`
  ${props => props.active ? 
    css`
      background-color: ${props.theme.global.colors.brand};
    ` :
    css`
      background-color: ${props.theme.dark ? props.theme.global.colors['dark-1'] : 'inherit'};
    `
  }
  border-radius: 50%;
  padding: ${paddingSize};

  &:hover, &:focus {
    ${props => props.theme.dark ?
      css`
        background-color: ${props.theme.global.colors['neutral-1']};
      ` :
      css`
        background-color: ${props.theme.global.colors['accent-1']};
      `
    }

    > svg {
      fill: white;

      > circle {
        fill: ${props => props.theme.dark ? 'white' : 'black'};
        stroke: ${props => props.theme.dark ? 'black' : 'white'};
      }

      > path {
        fill: ${props => props.theme.dark ? 'black' : 'white'};
      }
    }
  }

  > svg {
    ${props => props.active ?
      css`
        fill: white;
      ` :
      css`
        fill: ${props.theme.dark ? 'white' : 'black'};
      `
    }
    height: ${svgSize};
    stroke: transparent;
    width: ${svgSize};
  }
`

class Button extends React.Component {
  render () {
    const {
      active,
      a11yTitle,
      disabled,
      icon,
      onBlur,
      onClick,
      onFocus,
      onMouseOver,
      onMouseOut
    } = this.props

    const eventHandlers = (disabled)
      ? {}
      : {
        onBlur,
        onClick,
        onFocus,
        onMouseOver,
        onMouseOut
      }

    return (
      <StyledButton
        active={active}
        a11yTitle={a11yTitle}
        disabled={disabled}
        icon={icon}
        margin={{ bottom: 'xsmall' }}
        title={a11yTitle}
        {...eventHandlers}
      />
    )
  }
}

Button.propTypes = {
  active: bool,
  onBlur: func,
  onClick: func,
  onFocus: func,
  onMouseOver: func,
  onMouseOut: func
}

Button.defaultProps = {
  active: false,
  onBlur: () => {},
  onClick: () => {},
  onFocus: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {}
}

export default Button
