import { bool, func } from 'prop-types'
import { Box, Button as GrommetButton, Text, Tip } from 'grommet'
import styled, { css } from 'styled-components'

const StyledButton = styled(GrommetButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${props =>
    props.theme.dark
      ? props.theme.global.colors['dark-3']
      : 'inherit'
    };
  
  > svg {
    fill: ${props => (props.theme.dark ? 'white' : 'black')};
    width: min(50%, 1.2rem); // See similar dimension in FieldGuideButton
    stroke: transparent;
  }

  :not(:last-child) {
    margin-bottom: clamp(8px, 20%, 10px);
    // similar to padding of Image Toolbar
  }
  
  &[aria-pressed='true'] {
    background-color: ${props => props.theme.global.colors.brand};

    > svg {
      fill: white;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled):not([aria-pressed='true']),
  &:focus:not(:disabled):not([aria-pressed='true']) {
    ${props =>
      props.theme.dark
        ? css`
            background-color: ${props.theme.global.colors['neutral-1']};
          `
        : css`
            background-color: ${props.theme.global.colors['accent-1']};
          `}

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
`

const HoverContent = styled(Box)`
  // When hover is not supported, such as a touchscreen
  display: none;

  @media (hover: hover) {
    /* when hover is supported */
    display: flex;
  }
`

const Triangle = styled(Box)`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 0 8px 10px;
  border-color: transparent transparent transparent
    ${props => props.theme.global.colors['dark-4']};
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
    <Triangle />
  </HoverContent>
)

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
  onPointerUp = DEFAULT_HANDLER,
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
      }

  return (
    <Tip
      content={<TipContent message={a11yTitle} />}
      plain
      dropProps={{
        align: { right: 'left' }
      }}
    >
      <StyledButton
        active={active}
        a11yTitle={a11yTitle}
        disabled={disabled}
        icon={icon}
        plain
        {...eventHandlers}
        {...props}
      />
    </Tip>
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
