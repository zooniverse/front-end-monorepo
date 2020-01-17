import PropTypes from 'prop-types'
import React from 'react'

function Background ({ borderColor, fill, height, width, ...rest }) {
  return (
    <rect
      fill={fill}
      height={height}
      stroke={borderColor || ''}
      strokeWidth={(borderColor)  ? 1 : 0}
      width={width}
      {...rest}
    />
  )
}

Background.defaultProps = {
  borderColor: '',
  fill: '',
  height: '100%',
  width: '100%'
}

Background.propTypes = {
  borderColor: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
}

export default Background
