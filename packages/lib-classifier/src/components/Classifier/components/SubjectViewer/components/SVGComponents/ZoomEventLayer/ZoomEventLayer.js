import PropTypes from 'prop-types'
import styled, { css, useTheme } from 'styled-components'

const StyledGroup = styled.g`
  ${props => props.$panning ?
   css`cursor: move;` :
   css`cursor: inherit;`}
  overscroll-behavior: none;

  &:focus {
    ${props => 
      css`
        outline-color: ${props.$focusColor};
        border: solid thick ${props.$focusColor};
        box-shadow: 0 0 4px 4px ${props.$focusColor};
      `
    }
  }
`

const DEFAULT_HANDLER = () => true

function ZoomEventLayer ({
  height,
  left = 0,
  onDoubleClick = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  onPointerEnter = DEFAULT_HANDLER,
  onPointerDown = DEFAULT_HANDLER,
  onPointerMove = DEFAULT_HANDLER,
  onPointerUp = DEFAULT_HANDLER,
  onPointerLeave = DEFAULT_HANDLER,
  onWheel = DEFAULT_HANDLER,
  panning = false,
  top = 0,
  width,
  children,
  ...rest
}) {
  const theme = useTheme()
  const focusColor = theme?.global.colors[theme.global.colors.focus]

  function handlePointerFocus(event) {
    event.currentTarget?.focus()
    onPointerDown(event)
  }

  return (
    <StyledGroup
      data-testid='zoom-layer'
      fill='transparent'
      $focusColor={focusColor}
      height={height}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerDown={handlePointerFocus}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onWheel={onWheel}
      $panning={(panning) ? 'true' : undefined}
      transform={`translate(${left}, ${top})`}
      width={width}
      {...rest}
    >
      {children}
    </StyledGroup>
  )
}

ZoomEventLayer.propTypes = {
  height: PropTypes.number.isRequired,
  left: PropTypes.number,
  onDoubleClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPointerDown: PropTypes.func.isRequired,
  onPointerEnter: PropTypes.func,
  onPointerMove: PropTypes.func.isRequired,
  onPointerUp: PropTypes.func.isRequired,
  onPointerLeave: PropTypes.func.isRequired,
  onWheel: PropTypes.func,
  panning: PropTypes.bool,
  theme: PropTypes.object,
  top: PropTypes.number,
  width: PropTypes.number.isRequired
}

export default ZoomEventLayer
