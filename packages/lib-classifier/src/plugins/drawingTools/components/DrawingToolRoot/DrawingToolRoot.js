import PropTypes from 'prop-types'
import React, { forwardRef, useState } from 'react'
import styled from 'styled-components'
import draggable from '../draggable'

const STROKE_WIDTH = 2
const SELECTED_STROKE_WIDTH = 3

const StyledGroup = styled('g')`
  :focus {
    outline: none;
  }
  :hover {
    cursor: ${props => props.dragging ? 'grabbing' : 'grab'};
  }
`

const DrawingToolRoot = forwardRef(function DrawingToolRoot ({
  children,
  dragging,
  isActive,
  label,
  mark,
  onDelete,
  onDeselect,
  onSelect,
  scale
}, ref) {
  const { tool } = mark
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    stroke: tool && tool.color ? tool.color : 'green'
  }

  function onKeyDown (event) {
    switch (event.key) {
      case 'Backspace': {
        event.preventDefault()
        event.stopPropagation()
        onDelete(mark)
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

  function deselect (event) {
    onDeselect(mark)
  }

  return (
    <StyledGroup
      {...mainStyle}
      ref={ref}
      aria-label={label}
      dragging={dragging}
      strokeWidth={isActive ? SELECTED_STROKE_WIDTH / scale : STROKE_WIDTH / scale}
      focusable
      tabIndex={0}
      onBlur={deselect}
      onFocus={select}
      onKeyDown={onKeyDown}
    >
      {children}
    </StyledGroup>
  )
})

DrawingToolRoot.propTypes = {
  active: PropTypes.bool,
  dragging: PropTypes.bool,
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
  scale: PropTypes.number,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

DrawingToolRoot.defaultProps = {
  active: false,
  dragging: false,
  onDelete: () => true,
  onDeselect: () => true,
  onSelect: () => true,
  scale: 1,
  tool: {
    color: 'green'
  }
}

export default draggable(DrawingToolRoot)
