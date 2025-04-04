import { useWheel } from '@use-gesture/react'
import PropTypes from 'prop-types'
import { useRef } from 'react'
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
  disabled = false,
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
  const root = useRef(null)
  const theme = useTheme()
  const focusColor = theme?.global.colors[theme.global.colors.focus]
  const pointerEvents = disabled ? 'none' : 'all'

  const handleWheel = disabled ? DEFAULT_HANDLER : ({ event }) => onWheel(event)
  useWheel(handleWheel, {
    eventOptions: { passive: false },
    target: root
  })

  function handlePointerFocus(event) {
    /*
    * Ignore clicks to close open popups for subtasks etc
    * by checking whether the event target is a Grommet Layer.
    * Otherwse, clicking outside an open popup can start dragging
    * in the ZoomEventLayer.
    */
    // HTMLElement class name.
    const className = event.target?.className
    // SVGElement class name.
    const baseVal = className?.baseVal
    const actualClassName = baseVal ?? className
    if (actualClassName.includes('StyledLayer')) return false
    /* Focus the clicked element so that it can handle
    * keyboard events.
    */
    event.target?.focus({
      preventScroll: true
    })
    return onPointerDown(event)
  }

  const zoomEventHandlers = disabled ? {} : {
    onDoubleClick,
    onPointerDown: handlePointerFocus,
    onPointerEnter,
    onPointerMove,
    onPointerUp,
    onPointerLeave
  }

  return (
    <StyledGroup
      ref={root}
      data-testid='zoom-layer'
      fill='transparent'
      $focusColor={focusColor}
      height={height}
      onKeyDown={onKeyDown}
      $panning={(panning) ? 'true' : undefined}
      pointerEvents={pointerEvents}
      transform={`translate(${left}, ${top})`}
      width={width}
      {...zoomEventHandlers}
      {...rest}
    >
      {children}
    </StyledGroup>
  )
}

ZoomEventLayer.propTypes = {
  disabled: PropTypes.bool,
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
