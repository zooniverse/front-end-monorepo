import PropTypes from 'prop-types'
import React from 'react'

const Chart = React.forwardRef(function Chart ({ children, height, width, ...rest }, ref) {
  return (
    <svg height={height} ref={ref} width={width} {...rest}>
      {children}
    </svg>
  )
})

Chart.defaultProps = {
  height: '100%',
  width: '100%'
}

Chart.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

export default Chart
