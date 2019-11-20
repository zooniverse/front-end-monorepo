import PropTypes from 'prop-types'
import React from 'react'
import DrawingToolRoot from './DrawingToolRoot'

function Line ({ active, mark, tool }) {
  const { x1, y1, x2, y2 } = mark

  return (
    <DrawingToolRoot active tool={tool}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
    </DrawingToolRoot>
  )
}

Line.propTypes = {
  active: PropTypes.bool,
  tool: PropTypes.object
}

Line.defaultProps = {
  active: false
}

export default Line
