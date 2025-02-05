import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { forwardRef, useEffect, useRef } from 'react';
import styled, { css, useTheme } from 'styled-components'
import draggable from '../draggable'

const STROKE_WIDTH = 3
const SELECTED_STROKE_WIDTH = 6

const StyledGroup = styled.g`
  stroke-width: ${STROKE_WIDTH}px;

  &.active {
    stroke-width: ${SELECTED_STROKE_WIDTH}px;
  }

  &:focus {
    outline: none;
  }
  
  &:focus-visible {
    ${(props) =>
    css`
        outline: solid medium ${props.focusColor};
      `}
  }

  &[aria-disabled="false"]:hover {
    ${(props) =>
    props.dragging
      ? css`
            cursor: grabbing;
          `
      : css`
            cursor: grab;
          `}
  }
`

export function focusMark(markNode) {
  const hasFocus = markNode === document.activeElement
  if (!hasFocus) {
    const x = scrollX
    const y = scrollY
    markNode?.focus()
    window.scrollTo(x, y)
  }
}

function defaultHandler() {
  return true
}

const Mark = forwardRef(function Mark(
  {
    children,
    disabled = false,
    dragging = false,
    isActive = false,
    label,
    mark,
    onDelete = defaultHandler,
    onFinish = defaultHandler,
    onSelect = defaultHandler,
    pointerEvents = 'painted',
  },
  ref
) {
  const theme = useTheme()
  const markRoot = ref ?? useRef()
  const { tool } = mark
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    stroke: tool && tool.color ? tool.color : 'green'
  }
  const focusColor = theme?.global.colors[theme?.global.colors.focus]
  const usesSubTasks = mark.isValid && mark.tasks.length > 0

  function openSubTaskPopup() {
    if (!mark.subTaskVisibility) {
      const markBounds = markRoot.current?.getBoundingClientRect()
      mark.setSubTaskVisibility(true, markBounds)
    }
  }

  useEffect(function onSelectMark() {
    if (isActive && mark.finished) {
      focusMark(markRoot.current)
    }
  }, [isActive, mark.finished])

  useEffect(function onFinishMarkWithSubTasks() {
    if (usesSubTasks && mark.finished) {
      openSubTaskPopup()
    }
  }, [usesSubTasks, mark.finished])

  useEffect(function onCloseSubTasks() {
    if (mark.finished && !mark.subTaskVisibility) {
      focusMark(markRoot.current)
    }
  }, [mark.finished, mark.subTaskVisibility])

  function onKeyDown(event) {
    switch (event.key) {
      case 'Backspace': {
        event.preventDefault()
        event.stopPropagation()
        onDelete(mark)
        return false
      }
      case ' ':
      case 'Enter': {
        event.preventDefault()
        event.stopPropagation()
        openSubTaskPopup()
        onFinish(event)
        return false
      }
      default: {
        return true
      }
    }
  }

  function onPointerUp() {
    if (usesSubTasks) {
      openSubTaskPopup()
    }
  }

  function onFocus() {
    onSelect(mark)
    markRoot.current?.scrollIntoView?.()
  }

  let transform = ''
  transform =
    mark.x && mark.y
      ? `${transform} translate(${mark.x}, ${mark.y})`
      : transform

  if (mark.angle) {
    const rotateTransform =
      mark.x_rotate && mark.y_rotate
        ? `rotate(${mark.angle}, ${mark.x_rotate}, ${mark.y_rotate})`
        : `rotate(${mark.angle})`

    transform = `${transform} ${rotateTransform}`
  }

  return (
    <StyledGroup
      {...mainStyle}
      data-testid="mark-mark"
      aria-disabled={disabled ? 'true' : 'false'}
      aria-label={label}
      className={`drawingMark ${isActive ? 'active' : ''}`}
      dragging={dragging}
      focusable
      focusColor={focusColor}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onPointerUp={onPointerUp}
      pointerEvents={pointerEvents}
      ref={markRoot}
      role='button'
      tabIndex={disabled ? -1 : 0}
      transform={transform}
    >
      {children}
    </StyledGroup>
  )
})

Mark.propTypes = {
  dragging: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
  scale: PropTypes.number,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

export default draggable(observer(Mark))
export { Mark }
