import PropTypes from 'prop-types'
import { forwardRef } from 'react';

const Chart = forwardRef(function Chart ({ children, height, width, ...rest }, ref) {
  return (
    <svg
      data-testid='data-vis-chart'
      height={height}
      ref={ref}
      width={width}
      {...rest}
    >
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
