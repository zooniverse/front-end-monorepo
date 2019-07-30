import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom } from '@vx/axis'
import { scaleBand, scaleLinear } from '@vx/scale'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'

const BarChartViewer = React.forwardRef(function BarChartViewer({ backgroundFill, data, height, theme, width }, ref) {
  const yMax = height * 0.95
  const xScale = scaleBand({
    domain: data.map(datum => datum.label),
    rangeRound: [0, width],
    padding: 0.5
  })
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(datum => datum.value))],
    rangeRound: [yMax, 0]
  })

  const brandColor = theme.global.colors.brand
  const axisMargin = height
  const ticks = xScale.domain()
  return (
    <Chart height={height + 50} ref={ref} width={width}>
      <Background fill={backgroundFill} />
      <Group left={5} top={5}>
        {data.map((datum, index) => {
          const { label, value } = datum
          const key = `bar-${label}`
          const barHeight = yMax - yScale(value)
          const barWidth = xScale.bandwidth()
          const x = xScale(label)
          const y = yMax - barHeight
          return (
            <Bar
              fill={brandColor}
              height={barHeight}
              index={index}
              key={key}
              width={barWidth}
              x={x}
              y={y}
            />
          )
        })}
      </Group>
      <Group left={5} top={5}>
        <AxisBottom label='Letters' left={0} scale={xScale} ticks={ticks.length} top={axisMargin} />
      </Group>
    </Chart>
  )
})

BarChartViewer.defaultProps = {
  backgroundFill: 'white',
  height: 200,
  theme: {
    global: {
      colors: {}
    }
  },
  width: 200
}

BarChartViewer.propTypes = {
  backgroundFill: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  height: PropTypes.number,
  theme: PropTypes.object,
  width: PropTypes.number
}

export default withTheme(BarChartViewer)
export { BarChartViewer }