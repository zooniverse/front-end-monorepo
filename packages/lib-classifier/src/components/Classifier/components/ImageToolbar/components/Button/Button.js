import { bool, func } from 'prop-types'
import { Component } from 'react';
import { Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'

const svgSize = '1.2rem' // get a min and max for this too
                        // should be same as FieldGuideButton HelpIcon

const StyledButton = styled(GrommetButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.active ?
    css`
      background-color: ${props.theme.global.colors.brand};
    ` :
    css`
      background-color: ${props.theme.dark ? props.theme.global.colors['dark-3'] : 'inherit'};
    `
  }
  border-radius: 50%;
  padding: 10px;

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

class Button extends Component {
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
