import PropTypes from 'prop-types'
import React from 'react'

function Bar({ fill, height, index, width, x, y, ...rest }) {
  return (
    <rect
      fill={fill}
      height={height}
      index={index}
      width={width}
      x={x}
      y={y}
      {...rest}
    />
  )
}

Bar.defaultProps = {
  fill: 'teal',
  className: ''
}

Bar.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
}

export default Bar