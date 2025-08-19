import { Box, Button as GrommetButton, Text, Tip } from 'grommet'
import { bool, func, node, object, oneOfType, shape, string } from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled(GrommetButton)`
  align-items: center;
  aspect-ratio: 1;
  background-color: ${props =>
    props.theme.dark
      ? props.theme.global.colors['dark-3']
      : props.theme.global.colors['neutral-6']};
  border: 1.5px solid transparent;
  border-radius: 50%;
  display: flex;
  height: ${props => props.height || '40px' };
  justify-content: center;
  width: ${props => props.width || '40px' };

  > svg {
    fill: ${props =>
      props.theme.dark
        ? props.theme.global.colors['neutral-6']
        : props.theme.global.colors['dark-5']};
    stroke: ${props =>
      props.theme.dark
        ? props.theme.global.colors['neutral-6']
        : props.theme.global.colors['dark-5']};
    width: min(50%, 1.2rem);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.global.colors['light-4']};

    > svg {
      fill: ${props => props.theme.global.colors['light-5']};
    }
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.global.colors['accent-1']};

    > svg {
      fill: ${props => props.theme.global.colors['neutral-6']};
      stroke: ${props => props.theme.global.colors['neutral-6']};
    }

    .invert-icon {
      circle {
        fill: ${props => props.theme.dark ? props.theme.global.colors['accent-1'] : props.theme.global.colors['neutral-6']};
      }

      path {
        fill: ${props => props.theme.dark ? props.theme.global.colors['neutral-6'] : props.theme.global.colors['accent-1']};
      }
    }
  }

  &:focus-visible:not(:disabled) {
    border: 1.5px solid ${props => props.theme.global.colors['accent-1']};
    box-shadow: 0px 0px 8px ${props => props.theme.global.colors['accent-1']};
    outline: none;
  }

  &:active:not(:disabled),
  &[aria-pressed='true'],
  &[aria-checked='true'] {
    background-color: ${props => props.theme.global.colors['neutral-1']};

    > svg {
      fill: ${props => props.theme.global.colors['neutral-6']};
      stroke: ${props => props.theme.global.colors['neutral-6']};
    }
  }
`

const HoverContent = styled(Box)`
  // When hover is not supported, such as a touchscreen
  display: none;

  @media (hover: hover) {
    /* when hover is supported */
    display: flex;
  }
`

const TipContent = ({ message = '' }) => (
  <HoverContent
    direction='row'
    align='center'
    width='100%'
    animation={{ delay: 250, duration: 200, type: 'fadeIn' }}
  >
    <Box background='dark-4' round='5px' pad='5px'>
      <Text>{message}</Text>
    </Box>
  </HoverContent>
)

const DEFAULT_DROP_PROPS = {
  align: { top: 'bottom' }
}
const DEFAULT_HANDLER = () => true

function IconActionButton({
  active = false,
  a11yTitle,
  disabled = false,
  dropProps = DEFAULT_DROP_PROPS,
  icon,
  href,
  onBlur = DEFAULT_HANDLER,
  onClick = DEFAULT_HANDLER,
  onFocus = DEFAULT_HANDLER,
  onPointerDown = DEFAULT_HANDLER,
  onPointerOut = DEFAULT_HANDLER,
  onPointerOver = DEFAULT_HANDLER,
  onPointerUp = DEFAULT_HANDLER,
  role,
  ...props
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
      };

  const ariaPressed = role === 'checkbox' || href ? undefined : active.toString()

  return (
    <Tip
      content={<TipContent message={a11yTitle} />}
      plain
      dropProps={dropProps}
    >
      <StyledButton
        a11yTitle={a11yTitle}
        active={active}
        aria-pressed={ariaPressed}
        disabled={disabled}
        href={href}
        icon={icon}
        plain
        role={role}
        {...eventHandlers}
        {...props}
      />
    </Tip>
  )
}

IconActionButton.propTypes = {
  active: bool,
  a11yTitle: string,
  disabled: bool,
  dropProps: shape({
    align: shape({
      top: string,
      bottom: string,
      left: string,
      right: string
    })
  }),
  href: string,
  icon: oneOfType([node, object]),
  onBlur: func,
  onClick: func,
  onFocus: func,
  onPointerDown: func,
  onPointerOut: func,
  onPointerOver: func,
  onPointerUp: func,
  role: string,
  theme: shape({
    dark: bool
  })
}

export default IconActionButton
