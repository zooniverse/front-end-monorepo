import { bool, func } from 'prop-types'
import React from 'react'
import { Button as GrommetButton } from 'grommet'
import styled from 'styled-components'
import { pxToRem } from '@zooniverse/react-components'

const StyledButton = styled(GrommetButton)`
  background-color: ${props => props.active ? props.theme.global.colors.brand : (props.theme.dark ? props.theme.global.colors['dark-1'] : 'inherit')}; 
  border-radius: 50%;
  padding: ${pxToRem(13)};

  &:hover, &:focus {
    background-color: ${props => props.theme.dark ? props.theme.global.colors['neutral-2'] : props.theme.global.colors['accent-2']};

    > svg {
      fill: white;
    }
  }

  > svg {
    fill: ${props => props.active ? 'white' : (props.theme.dark ? 'white' : 'black')};
    height: ${pxToRem(18)};
    stroke: transparent;
    width: ${pxToRem(18)};
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
