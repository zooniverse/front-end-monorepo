import { Box, Button as GrommetButton, Text, Tip } from 'grommet'
import { bool, func, node, object, oneOfType, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'

const StyledButton = styled(GrommetButton)`
  align-items: center;
  aspect-ratio: 1;
  background-color: ${props =>
    props.theme.dark
    ? props.theme.global.colors['dark-3']
    : 'inherit'
  };
  border-radius: 50%;
  display: flex;
  height: ${props => props.height};
  justify-content: center;
  width: ${props => props.width};
  
  > svg {
    fill: ${props => (props.theme.dark ? 'white' : 'black')};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
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

  &[aria-pressed='true'] {
    background-color: ${props => props.theme.global.colors.brand};

    > svg {
      fill: white;
    }

    &:not(:hover) {
      background-color: ${props => props.theme.global.colors.brand};
      
      > svg {
        fill: white;
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

const DEFAULT_HANDLER = () => true

function IconActionButton({
  active = false,
  a11yTitle,
  disabled = false,
  icon,
  onBlur = DEFAULT_HANDLER,
  onClick = DEFAULT_HANDLER,
  onFocus = DEFAULT_HANDLER,
  onPointerDown = DEFAULT_HANDLER,
  onPointerOut = DEFAULT_HANDLER,
  onPointerOver = DEFAULT_HANDLER,
  onPointerUp = DEFAULT_HANDLER,
  tip = false,
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

  const ActionButton = (
    <StyledButton
      active={active}
      a11yTitle={a11yTitle}
      data-testid='test-icon-action-button'
      disabled={disabled}
      icon={icon}
      plain
      {...eventHandlers}
      {...props}
    />
  )

  if (tip) {
    return (
      <Tip
        content={<TipContent message={a11yTitle} />}
        plain
        dropProps={{
          align: { right: 'left' }
        }}
      >
        {ActionButton}
      </Tip>
    )
  }

  return ActionButton
}

IconActionButton.propTypes = {
  active: bool,
  a11yTitle: string,
  disabled: bool,
  icon: oneOfType([node, object]),
  onClick: func,
  onBlur: func,
  onFocus: func,
  onPointerDown: func,
  onPointerOut: func,
  onPointerOver: func,
  onPointerUp: func,
  theme: shape({
    dark: bool
  }),
  tip: bool
}

export default IconActionButton
