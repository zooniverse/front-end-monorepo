import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom } from '@vx/axis'
import { scaleBand, scaleLinear } from '@vx/scale'
import { withParentSize } from '@vx/responsive'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'

const BarChartViewer = React.forwardRef(function BarChartViewer(props, ref) {
  const {
    backgroundFill,
    data,
    parentHeight,
    parentWidth,
    theme
  } = props

  const yMax = parentHeight * 0.85
  const xScale = scaleBand({
    domain: data.map(datum => datum.label),
    rangeRound: [0, parentWidth],
    padding: 0.5
  })
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(datum => datum.value))],
    rangeRound: [yMax, 0]
  })

  const brandColor = theme.global.colors.brand
  const ticks = xScale.domain()
  return (
    <Chart height={parentHeight} ref={ref} width={parentWidth}>
      <Background fill={backgroundFill} />
      <Group width={parentWidth}>
        {data.map((datum, index) => {
          const { color, label, value } = datum
          const fill = color || brandColor
          const key = `bar-${label}`
          const barHeight = yMax - yScale(value)
          const barWidth = xScale.bandwidth()
          const x = xScale(label)
          const y = yMax - barHeight
          return (
            <Bar
              fill={fill}
              height={barHeight}
              index={index}
              key={key}
              width={barWidth}
              x={x}
              y={y}
            />
          )
        })}
        <AxisBottom label='Letters' left={0} scale={xScale} ticks={ticks.length} top={yMax} />
      </Group>
    </Chart>
  )
})

BarChartViewer.defaultProps = {
  backgroundFill: 'white',
  theme: {
    global: {
      colors: {}
    }
  }
}

BarChartViewer.propTypes = {
  backgroundFill: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object
}

export default withTheme(withParentSize(BarChartViewer))
export { BarChartViewer }