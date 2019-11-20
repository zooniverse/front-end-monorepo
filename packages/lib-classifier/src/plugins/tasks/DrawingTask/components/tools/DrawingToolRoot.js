import PropTypes from 'prop-types'
import React, { forwardRef, useState } from 'react'
import draggable from '../components/draggable'

const STROKE_WIDTH = 2
const SELECTED_STROKE_WIDTH = 3

const DrawingToolRoot = forwardRef(({ children, isActive, mark, svg, tool, onDelete }, ref) => {
  const [ active, setActive ] = useState(isActive)
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

  function select (event) {
    setActive(true)
  }

  function deselect (event) {
    setActive(false)
  }

  return (
    <g
      {...mainStyle}
      ref={ref}
      strokeWidth ={active ? SELECTED_STROKE_WIDTH : STROKE_WIDTH}
      focusable
      tabIndex='-1'
      onFocus={select}
      onBlur={deselect}
      onKeyDown={onKeyDown}
      onPointerDown={select}
      onPointerUp={deselect}
    >
      {React.cloneElement(React.Children.only(children), { active })}
    </g>
  )
})

DrawingToolRoot.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  tool: PropTypes.shape({
    color: PropTypes.string
  })
}

DrawingToolRoot.defaultProps = {
  active: false,
  tool: {
    color: 'green'
  }
}

export default draggable(DrawingToolRoot)
