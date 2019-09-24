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
    axis,
    backgroundFill,
    data,
    parentHeight,
    parentWidth,
    theme
  } = props
  const { colors, font } = theme.global
  let axisColor = (theme.dark) ? colors.text.dark : colors.text.light
  let backgroundColor = (theme.dark) ? colors['dark-3'] : 'white'
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

  if (backgroundFill.dark && backgroundFill.light) {
    backgroundColor = (theme.dark) ? backgroundFill.dark : backgroundFill.light
  }

  if (axis.color && axis.color.dark && axis.color.light) {
    axisColor = (theme.dark) ? axis.color.dark : axis.color.light
  } 

  const ticks = xScale.domain()
  return (
    <Chart height={parentHeight} ref={ref} width={parentWidth}>
      <Background fill={backgroundColor} />
      <Group width={parentWidth}>
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
        <AxisBottom
          label={axis.label}
          labelProps={{
            fill: axisColor,
            textAnchor: 'middle',
            fontSize: 12,
            fontFamily: font.family
          }}
          left={0}
          scale={xScale}
          stroke={axisColor}
          ticks={ticks.length}
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
  backgroundFill: {},
  theme: {
    dark: false,
    global: {
      colors: {}
    }
  }
}

BarChartViewer.propTypes = {
  axis: PropTypes.shape({
    color: PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string
    }),
    label: PropTypes.string.isRequired
  }).isRequired,
  backgroundFill: PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  }),
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