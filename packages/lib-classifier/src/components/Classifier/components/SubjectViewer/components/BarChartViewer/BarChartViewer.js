import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'
import { Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { scaleBand, scaleLinear } from '@vx/scale'
import { withParentSize } from '@vx/responsive'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'

const BarChartViewer = React.forwardRef(function BarChartViewer (props, ref) {
  const {
    barStyles: {
      padding
    },
    data,
    options: { axis },
    parentHeight,
    parentWidth,
    theme: { dark, global: { colors, font } },
    xAxisLabel,
    xAxisMargin,
    yAxisLabel,
    yAxisMargin
  } = props

  let axisColor = (dark) ? colors.text.dark : colors.text.light
  // Should we put white into the theme?
  let backgroundColor = (dark) ? colors['dark-3'] : 'white'
  const xMax = parentWidth - xAxisMargin
  const yMax = parentHeight - yAxisMargin

  const xScale = scaleBand({
    domain: data.map(datum => datum.label),
    rangeRound: [0, xMax],
    padding
  })
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(datum => datum.value))],
    rangeRound: [yMax, 0]
  })

  const xScaleTicks = xScale.domain()
  const yScaleTicks = yScale.domain()
  return (
    <Chart height={parentHeight} ref={ref} width={parentWidth}>
      <Background fill={backgroundColor} />
      <Group left={xAxisMargin}>
        {data.map((datum, index) => {
          const { color, label, value } = datum
          const fill = color || colors.brand
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
      </Group>
      <Group left={xAxisMargin}>
        <AxisLeft
          label={yAxisLabel}
          labelProps={{
            fill: axisColor,
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: font.family
          }}
          left={0}
          scale={yScale}
          stroke={axisColor}
          ticks={yScaleTicks.length}
          tickStroke={axisColor}
          tickLabelProps={(value, index) => ({
            fill: axisColor,
            textAnchor: 'end',
            fontSize: 10,
            fontFamily: font.family,
            dx: '-0.25em',
            dy: '0.25em'
          })}
          top={0}
        />
        <AxisBottom
          label={xAxisLabel}
          labelProps={{
            fill: axisColor,
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: font.family
          }}
          left={0}
          scale={xScale}
          stroke={axisColor}
          ticks={xScaleTicks.length}
          tickStroke={axisColor}
          tickLabelProps={(value, index) => ({
            fill: axisColor,
            textAnchor: 'middle',
            fontSize: 10,
            fontFamily: font.family
          })}
          top={yMax}
        />
      </Group>
    </Chart>
  )
})

BarChartViewer.defaultProps = {
  barStyles: {
    padding: 0.25
  },
  xAxisLabel: '',
  xAxisMargin: 40,
  yAxisLabel: '',
  yAxisMargin: 40,
  theme: {
    dark: false,
    global: {
      colors: {
        brand: '',
        text: {}
      },
      font: {
        family: ''
      }
    }
  }
}

BarChartViewer.propTypes = {
  barStyles: PropTypes.shape({
    padding: PropTypes.number
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  options: PropTypes.shape({
    axis: PropTypes.shape({
      color: PropTypes.shape({
        dark: PropTypes.string,
        light: PropTypes.string
      }),
      label: PropTypes.string
    })
  }),
  parentHeight: PropTypes.number.isRequired,
  parentWidth: PropTypes.number.isRequired,
  theme: PropTypes.object
}

export default withTheme(withParentSize(BarChartViewer))
export { BarChartViewer }
