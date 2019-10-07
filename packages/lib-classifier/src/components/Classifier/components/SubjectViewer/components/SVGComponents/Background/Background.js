import PropTypes from 'prop-types'
import React from 'react'

function Background({ fill, height, width, ...rest }) {
  return (
    <rect
      fill={fill}
      height={height}
      width={width}
      {...rest}
    />
  )
}

Background.defaultProps = {
  fill: 'white',
  height: '100%',
  width: '100%'
}

Background.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
}

export default Background