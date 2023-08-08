import { bool, func } from 'prop-types'
import { Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'

const StyledButton = styled(GrommetButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  ${props => props.active
      ? css`background-color: ${props.theme.global.colors.brand};`
      : css`background-color: ${props.theme.dark
            ? props.theme.global.colors['dark-3']
            : 'inherit'};`}
  
  :not(:last-child) {
    margin-bottom: clamp(8px, 20%, 10px); 
    // similar to padding of Image Toolbar
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    ${props => props.theme.dark
        ? css`background-color: ${props.theme.global.colors['neutral-1']};`
        : css`background-color: ${props.theme.global.colors['accent-1']};`}

    > svg {
      fill: white;

      > circle {
        fill: ${props => (props.theme.dark ? 'white' : 'black')};
        stroke: ${props => (props.theme.dark ? 'black' : 'white')};
      }

      > path {
        fill: ${props => (props.theme.dark ? 'black' : 'white')};
      }
    }
  }

  > svg {
    ${props => props.active
        ? css`fill: white;`
        : css`fill: ${props.theme.dark ? 'white' : 'black'};`}
    width: min(50%, 1.2rem); // See similar dimension in FieldGuideButton
    stroke: transparent;
  }
`

function DEFAULT_HANDLER() {
  return true
}

function Button({
  active = false,
  a11yTitle,
  disabled,
  icon,
  onBlur = DEFAULT_HANDLER,
  onClick = DEFAULT_HANDLER,
  onFocus = DEFAULT_HANDLER,
  onPointerDown = DEFAULT_HANDLER,
  onPointerOut = DEFAULT_HANDLER,
  onPointerOver = DEFAULT_HANDLER,
  onPointerUp = DEFAULT_HANDLER
}) {
  const eventHandlers = disabled
    ? {}
    : {
        onBlur,
        onClick,
        onFocus,
        onPointerDown,
        onPointerOut,
        onPointerOver,
        onPointerUp
      }

  return (
    <StyledButton
      active={active}
      a11yTitle={a11yTitle}
      disabled={disabled}
      icon={icon}
      plain
      {...eventHandlers}
    />
  )
}

Button.propTypes = {
  active: bool,
  onBlur: func,
  onClick: func,
  onFocus: func,
  onPointerDown: func,
  onPointerOut: func,
  onPointerOver: func,
  onPointerUp: func
}

export default Button
