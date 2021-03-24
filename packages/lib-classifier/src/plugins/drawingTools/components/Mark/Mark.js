import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled, { css, withTheme } from 'styled-components'
import draggable from '../draggable'

const STROKE_WIDTH = 2
const SELECTED_STROKE_WIDTH = 4

const StyledGroup = styled('g')`
  &:focus {
    ${props => css`outline: solid 4px ${props.focusColor};`}
  }

  :hover {
    ${props => props.dragging ?
      css`cursor: grabbing;` :
      css`cursor: grab;`
    }
  }
`

const Mark = forwardRef(function Mark ({
  children,
  dragging,
  isActive,
  label,
  mark,
  onDelete,
  onFinish,
  onSelect,
  scale,
  theme
}, ref) {
  const { tool } = mark
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    stroke: tool && tool.color ? tool.color : 'green'
  }
  const focusColor = theme.global.colors[theme.global.colors.focus]

  React.useEffect(() => {
    if (mark.finished && !mark.subTaskVisibility) {
      mark.setSubTaskVisibility(true, ref?.current)
    }
  }, [mark.finished])

  function onKeyDown (event) {
    switch (event.key) {
      case 'Backspace': {
        event.preventDefault()
        event.stopPropagation()
        onDelete(mark)
        return false
      }
      case 'Enter': {
        event.preventDefault()
        event.stopPropagation()
        onFinish(event)
        return false
      }
      case ' ': {
        event.preventDefault()
        event.stopPropagation()
        onFinish(event)
        return false
      }
      default: {
        return true
      }
    }
  }

  function select () {
    onSelect(mark)
  }

  let transform = ''
  transform = (mark.x && mark.y) ? `${transform} translate(${mark.x}, ${mark.y})` : transform
  transform = mark.angle ? `${transform} rotate(${mark.angle})` : transform

  return (
    <StyledGroup
      {...mainStyle}
      aria-label={label}
      dragging={dragging}
      focusable
      focusColor={focusColor}
      onFocus={select}
      onKeyDown={onKeyDown}
      ref={ref}
      role='button'
      strokeWidth={isActive ? SELECTED_STROKE_WIDTH / scale : STROKE_WIDTH / scale}
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

export default draggable(withTheme(Mark))
export { Mark }
