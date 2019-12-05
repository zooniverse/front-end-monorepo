import React from 'react'
import styled from 'styled-components'

const StyledGroup = styled('g')`
  &:hover {
    cursor: pointer;
  }
`

function DeleteButton ({ label, mark, scale, svg, rotate, onDelete, usePointer }) {
  const RADIUS = (screen.width < 900) ? 11 : 8
  const STROKE_COLOR = 'white'
  const FILL_COLOR = 'black'
  const STROKE_WIDTH = 1.5
  const CROSS_PATH = `
    M ${-1 * RADIUS * 0.7} 0
    L ${RADIUS * 0.7} 0
    M 0 ${-1 * RADIUS * 0.7}
    L 0 ${RADIUS * 0.7}
  `
  const { x, y } = mark.deleteButtonPosition(scale)
  const matrix = svg.getScreenCTM()
  const transform = `
    translate(${x}, ${y})
    rotate(${rotate})
    matrix( ${1 / matrix.a} 0 0 ${1 / matrix.d} 0 0)
  `
  function onKeyDown (event) {
    switch (event.key) {
      case 'Enter':
      case ' ': {
        return onPointerDown(event)
      }
      default: {
        return true
      }
    }
  }

  function onPointerDown (event) {
    event.preventDefault()
    event.stopPropagation()
    onDelete()
    return false
  }

  const eventHandlers = usePointer ? { onKeyDown, onPointerDown } : { onKeyDown, onMouseDown: onPointerDown }

  return (
    <StyledGroup
      focusable
      tabIndex={0}
      aria-label={label}
      role='button'
      transform={transform}
      stroke={STROKE_COLOR}
      strokeWidth={STROKE_WIDTH}
      {...eventHandlers}
    >
      <circle
        r={RADIUS}
        fill={FILL_COLOR}
      />
      <path
        d={CROSS_PATH}
        transform='rotate(45)'
      />
    </StyledGroup>
  )
}

DeleteButton.defaultProps = {
  x: 0,
  y: 0,
  rotate: 0,
  destroyTransitionDuration: 300,
  usePointer: !!window.PointerEvent
}

export default DeleteButton
