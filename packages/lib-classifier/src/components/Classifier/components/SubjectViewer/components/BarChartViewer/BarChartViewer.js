import PropTypes from 'prop-types'
import React from 'react'
import { scaleLinear, scaleBand } from '../../helpers/d3'
import Chart from '../SVGComponents/Chart'
import Background from '../SVGComponents/Background'
import Group from '../SVGComponents/Group'
import Bar from './components/Bar'

const BarChartViewer = React.forwardRef(function BarChartViewer({ backgroundFill, data, height, width }, ref) {
  const yMax = height - 120
  const xScale = scaleBand({
    domain: data.map(datum => datum.label),
    rangeRound: [0, width],
    padding: 0.5
  })
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(datum => datum.value))],
    rangeRound: [yMax, 0]
  })
  return (
    <Chart ref={ref}>
      <Background fill={backgroundFill} />
      <Group>
        {data.map((datum, index) => {
          const { label, value } = datum
          const key = `bar-${label}`
          const barHeight = yMax - yScale(value)
          const barWidth = xScale.bandwidth()
          const x = xScale(label)
          const y = yMax - barHeight
          return (
            <Bar
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
    </Chart>
  )
})

BarChartViewer.defaultProps = {
  backgroundFill: 'white',
  height: 200,
  width: 200
}

BarChartViewer.propTypes = {
  backgroundFill: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  height: PropTypes.number,
  width: PropTypes.number
}

export default BarChartViewer