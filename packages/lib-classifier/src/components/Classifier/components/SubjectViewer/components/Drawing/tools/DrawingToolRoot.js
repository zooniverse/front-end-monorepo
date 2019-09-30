import PropTypes from 'prop-types'
import React from 'react'

const STROKE_WIDTH = 1.5
const SELECTED_STROKE_WIDTH = 2.5

const DrawingToolRoot = ({ active, children, tool }) => {
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    pointerEvents: 'none',
    stroke: tool && tool.color ? tool.color : 'green',
    strokeWidth: active ? SELECTED_STROKE_WIDTH : STROKE_WIDTH
  }

  return (
    <g {...mainStyle} focusable tabIndex='-1'>
      {children}
    </g>
  )
}

DrawingToolRoot.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

export default DrawingToolRoot
