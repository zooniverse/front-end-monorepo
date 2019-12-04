import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Bar } from '@vx/shape'

function Bars (props) {
  const {
    data,
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
    const alt = `${xAxisLabel} ${label}: ${yAxisLabel} ${value}`
    return (
      <Bar
        aria-label={alt}
        data-label={label}
        data-value={value}
        fill={fill}
        key={key}
        height={barHeight}
        index={index}
        onMouseMove={(event) => onMouseMove(event, value)}
        onMouseOut={onMouseOut}
        role='img'
        width={barWidth}
        x={x}
        y={y}
      />
    )
  })
}

export default withTheme(Bars)
export { Bars }