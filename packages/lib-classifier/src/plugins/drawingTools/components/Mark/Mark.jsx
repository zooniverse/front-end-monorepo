import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { forwardRef, useEffect, useRef } from 'react';
import styled, { css, useTheme } from 'styled-components'
import draggable from '../draggable'

export const STROKE_WIDTH = 2
export const SELECTED_STROKE_WIDTH = 4

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
    onDeselect = defaultHandler,
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
  const usesSubTasks = mark.finished && mark.isValid && mark.tasks.length > 0

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
    /* usesSubTasks flips from false => true when a mark is
      - finished.
      - valid.
      - has subtasks.
    */
    if (usesSubTasks) {
      openSubTaskPopup()
    }
  }, [usesSubTasks])

  useEffect(function onCloseSubTasks() {
    /* This runs for each drawn mark when the subtask popup is closed.
    Return keyboard focus to the mark that opened the popup, then deselect it.
    */
    if (isActive && usesSubTasks && !mark.subTaskVisibility) {
      focusMark(markRoot.current)
      onDeselect()
    }
  }, [usesSubTasks, isActive, mark.subTaskVisibility, onDeselect])

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
        onSelect(mark)
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
    onSelect(mark)
    if (usesSubTasks) {
      openSubTaskPopup()
    }
  }

  function onFocus() {
    onSelect(mark)
    markRoot.current?.scrollIntoView?.()
  }

  function onBlur() {
    if (!mark.subTaskVisibility) {
      onDeselect()
    }
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
      id={`mark-${mark.id}`}
      data-testid="mark-mark"
      aria-disabled={disabled ? 'true' : 'false'}
      aria-label={label}
      className={`drawingMark ${isActive ? 'active' : ''}`}
      dragging={dragging}
      focusable
      focusColor={focusColor}
      onFocus={onFocus}
      onBlur={onBlur}
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
  disabled: PropTypes.bool,
  dragging: PropTypes.bool,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  mark: PropTypes.shape({
    angle: PropTypes.number,
    finished: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isValid: PropTypes.bool,
    setSubTaskVisibility: PropTypes.func.isRequired,
    subTaskVisibility: PropTypes.bool,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    tool: PropTypes.shape({
      color: PropTypes.string
    }),
    x: PropTypes.number,
    x_rotate: PropTypes.number,
    y: PropTypes.number,
    y_rotate: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onDeselect: PropTypes.func,
  onFinish: PropTypes.func,
  onSelect: PropTypes.func,
  pointerEvents: PropTypes.string,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

export default draggable(observer(Mark))
export { Mark }
