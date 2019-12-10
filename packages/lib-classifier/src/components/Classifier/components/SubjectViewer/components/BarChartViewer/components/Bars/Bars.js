import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Bar } from '@vx/shape'

function Bars (props) {
  const {
    data,
    onBlur,
    onFocus,
    onMouseMove,
    onMouseOut,
    xAxisLabel,
    xScale,
    yAxisLabel,
    yScale,
    yMax,
    theme: { global: { colors } }
  } = props

  return data.map((datum, index) => {
    const { color, label, value } = datum
    const fill = colors[color] || color || colors.brand
    const key = `bar-${label}`
    const barHeight = yMax - yScale(value)
    const barWidth = xScale.bandwidth()
    const x = xScale(label)
    const y = yMax - barHeight
    const barCenter = x + (barWidth / 2)
    const alt = `${xAxisLabel} ${label}: ${yAxisLabel} ${value}`
    return (
      <Bar
        aria-label={alt}
        data-label={label}
        data-value={value}
        fill={fill}
        focusable
        key={key}
        height={barHeight}
        index={index}
        onFocus={(event) => onFocus(event, { value, barCenter, barWidth, x, y })}
        onBlur={onBlur}
        onMouseMove={(event) => onMouseMove(event, { value, barCenter, barWidth, x, y })}
        // onMouseOut={onMouseOut}
        tabIndex={0}
        role='list item'
        width={barWidth}
        x={x}
        y={y}
      />
    )
  })
}

Bars.defaultProps = {
  onBlur: () => {},
  onFocus: () => {},
  onMouseMove: () => {},
  onMouseOut: () => {},
  theme: {
    dark: false,
    global: {
      colors: {
        brand: '',
        text: {}
      }
    }
  },
  xAxisLabel: 'x-axis',
  yAxisLabel: 'y-axis'
}

Bars.propTypes = {
  data: PropTypes.array.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  theme: PropTypes.object,
  xAxisLabel: PropTypes.string,
  xScale: PropTypes.func.isRequired,
  yAxisLabel: PropTypes.string,
  yScale: PropTypes.func.isRequired,
  yMax: PropTypes.number.isRequired
}

export default withTheme(Bars)
export { Bars }