import PropTypes from 'prop-types'
import React, { useState } from 'react'

const STROKE_WIDTH = 1.5
const SELECTED_STROKE_WIDTH = 2.5

function DrawingToolRoot ({ children, tool }) {
  const [ active, setActive ] = useState(true)
  const mainStyle = {
    color: tool && tool.color ? tool.color : 'green',
    fill: 'transparent',
    stroke: tool && tool.color ? tool.color : 'green',
    strokeWidth: active ? SELECTED_STROKE_WIDTH : STROKE_WIDTH
  }

  function onPointerDown (event) {
    console.log(`${tool.type} clicked`)
    event.stopPropagation()
    event.preventDefault()
    setActive(true)
  }

  function onPointerMove (event) {
    console.log(`${tool.type} moved`)
    event.stopPropagation()
    event.preventDefault()
  }

  function onPointerUp (event) {
    console.log(`${tool.type} dropped`)
    setActive(false)
  }

  return (
    <g
      {...mainStyle}
      focusable
      tabIndex='-1'
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
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
