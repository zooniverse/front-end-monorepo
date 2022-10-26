import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { forwardRef, useEffect, useRef } from 'react'
import styled, { css, withTheme } from 'styled-components'
import draggable from '../draggable'

const STROKE_WIDTH = 2
const SELECTED_STROKE_WIDTH = 4

const StyledGroup = styled('g')`
  &:focus {
    ${(props) =>
      css`
        outline: solid 4px ${props.focusColor};
      `}
  }

  :hover {
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

function focusMark(markNode) {
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
const defaultTheme = {
  global: {
    colors: {}
  }
}
const Mark = forwardRef(function Mark(
  {
    children,
    dragging = false,
    isActive = false,
    label,
    mark,
    onDelete = defaultHandler,
    onFinish = defaultHandler,
    onSelect = defaultHandler,
    pointerEvents = 'painted',
    scale = 1,
    theme = defaultTheme
  },
  ref
) {
  const markRoot = ref ?? useRef()
  const { tool } = mark
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    stroke: tool && tool.color ? tool.color : 'green'
  }
  const focusColor = theme.global.colors[theme.global.colors.focus]
  const usesSubTasks = mark.isValid && mark.tasks.length > 0

  function openSubTaskPopup() {
    if (!mark.subTaskVisibility) {
      const markBounds = markRoot.current?.getBoundingClientRect()
      mark.setSubTaskVisibility(true, markBounds)
    }
  }

  useEffect(() => {
    if (isActive && mark.finished) {
      focusMark(markRoot.current)
    }
  }, [isActive, mark.finished])

  useEffect(() => {
    if (usesSubTasks && mark.finished) {
      openSubTaskPopup()
    }
  }, [usesSubTasks, mark.finished])

  useEffect(() => {
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
    markRoot.current?.scrollIntoView()
    onSelect(mark)
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
      aria-label={label}
      dragging={dragging}
      focusable
      focusColor={focusColor}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onPointerUp={onPointerUp}
      pointerEvents={pointerEvents}
      ref={markRoot}
      role='button'
      strokeWidth={
        isActive ? SELECTED_STROKE_WIDTH / scale : STROKE_WIDTH / scale
      }
      tabIndex='0'
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
  theme: PropTypes.object,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

const ObservedMark = observer(Mark)

ObservedMark.defaultProps = {
  theme: {
    global: {
      colors: {}
    }
  }
}

export default draggable(withTheme(ObservedMark))
export { Mark }
