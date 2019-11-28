import PropTypes from 'prop-types'
import React, { forwardRef, useState } from 'react'
import draggable from '../components/draggable'

const STROKE_WIDTH = 2
const SELECTED_STROKE_WIDTH = 3

const DrawingToolRoot = forwardRef(({
    children,
    isActive,
    mark,
    onDelete,
    onDeselect,
    onSelect,
    svg,
    tool
  }, ref) => {
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    stroke: tool && tool.color ? tool.color : 'green',
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
    <g
      {...mainStyle}
      ref={ref}
      strokeWidth ={isActive ? SELECTED_STROKE_WIDTH : STROKE_WIDTH}
      focusable
      tabIndex='-1'
      onFocus={select}
      onBlur={deselect}
      onKeyDown={onKeyDown}
    >
      {children}
    </g>
  )
})

DrawingToolRoot.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

DrawingToolRoot.defaultProps = {
  active: false,
  onDelete: () => true,
  onDeselect: () => true,
  onSelect: () => true,
  tool: {
    color: 'green'
  }
}

export default draggable(DrawingToolRoot)
