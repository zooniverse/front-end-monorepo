import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
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

const Mark = forwardRef(function Mark(
  {
    children,
    dragging,
    isActive,
    label,
    mark,
    onDelete,
    onFinish,
    onSelect,
    pointerEvents = 'painted',
    scale,
    theme
  },
  ref
) {
  const markRoot = ref ?? React.createRef()
  const { tool } = mark
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    stroke: tool && tool.color ? tool.color : 'green'
  }
  const focusColor = theme.global.colors[theme.global.colors.focus]

  function focusMark() {
    const hasFocus = markRoot.current === document.activeElement
    if (!hasFocus) {
      const x = scrollX
      const y = scrollY
      markRoot.current?.focus()
      window.scrollTo(x, y)
    }
  }

  function openSubTaskPopup() {
    if (
      mark.isValid &&
      mark.finished &&
      !mark.subTaskVisibility &&
      mark.tasks.length > 0
    ) {
      focusMark()
      const markBounds = markRoot.current?.getBoundingClientRect()
      mark.setSubTaskVisibility(true, markBounds)
    }
  }

  function onSubTaskVisibilityChange() {
    if (mark.finished && !mark.subTaskVisibility) {
      focusMark()
    }
  }

  React.useEffect(openSubTaskPopup, [mark.finished])
  React.useEffect(onSubTaskVisibilityChange, [mark.subTaskVisibility])

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

  function select() {
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
      onFocus={select}
      onKeyDown={onKeyDown}
      onPointerUp={openSubTaskPopup}
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

Mark.defaultProps = {
  dragging: false,
  isActive: false,
  onDelete: () => true,
  onDeselect: () => true,
  onSelect: () => true,
  scale: 1,
  theme: {
    global: {
      colors: {}
    }
  },
  tool: {
    color: 'green'
  }
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
