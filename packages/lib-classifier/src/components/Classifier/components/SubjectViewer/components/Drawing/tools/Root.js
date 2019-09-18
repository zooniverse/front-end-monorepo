import PropTypes from 'prop-types'
import React from 'react'

const STROKE_WIDTH = 1.5
const SELECTED_STROKE_WIDTH = 2.5

const DrawingToolRoot = ({ active, children, tool }) => {
  const mainStyle = {
    color: tool.color,
    fill: 'transparent',
    pointerEvents: 'none',
    stroke: tool.color,
    strokeWidth: active ? SELECTED_STROKE_WIDTH : STROKE_WIDTH
  }

  return (
    <g {...mainStyle} tabIndex='-1'>
      {children}
    </g>
  )
}

DrawingToolRoot.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

export default DrawingToolRoot
