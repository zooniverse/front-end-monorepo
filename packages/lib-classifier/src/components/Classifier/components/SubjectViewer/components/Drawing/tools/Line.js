import PropTypes from 'prop-types'
import React from 'react'
import DrawingToolRoot from './DrawingToolRoot'

const Line = ({ active, coordinates, tool }) => {
  if (!coordinates) return null

  return (
    <DrawingToolRoot active tool={tool}>
      <line {...coordinates} />
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
