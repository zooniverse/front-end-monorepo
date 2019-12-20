import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Bar } from '@vx/shape'
import Tippy from '@tippy.js/react'

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

  const [ tooltipShown, setTooltipToShow ] = React.useState(null)

  return data.map((datum, index) => {
    const { color, label, value } = datum
    const fill = colors[color] || color || colors.brand
    const key = `bar-${label}`
    const barHeight = yMax - yScale(value)
    const barWidth = xScale.bandwidth()
    const x = xScale(label)
    const y = yMax - barHeight
    // rounding the center calculation to match the tick position in the axis
    const barCenter = Math.round(x + (barWidth / 2))
    const alt = `${xAxisLabel} ${label}: ${yAxisLabel} ${value}`
    return (
      <Tippy
        content={value.toString()}
        key={key}
        visible={tooltipShown === key}
      >
        <Bar
          aria-label={alt}
          data-label={label}
          data-value={value}
          fill={fill}
          focusable
          height={barHeight}
          index={index}
          onFocus={(event) => setTooltipToShow(key)}
          // onBlur={onBlur}
          onMouseMove={(event) => setTooltipToShow(key)}
          // onMouseOut={onMouseOut}
          tabIndex={0}
          role='list item'
          width={barWidth}
          x={x}
          y={y}
        />
      </Tippy>
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